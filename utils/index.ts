import * as uuid from "jsr:@std/uuid";
import { Client } from "https://deno.land/x/postgres@v0.19.3/mod.ts";

export const settings = {
  debug: false
}



export const pgCreateClient = async (port: number) : Promise<Client> => {
  const client = new Client({
    user: "user",
    database: "example",
    password: "pass",
    hostname: "localhost",
    port,
  });
  await client.connect();
  return client
}

export const pgLoadSQLData = async (pg: Client, filePath : string, logSql = false) => {
  const sql = await Deno.readTextFile(filePath);
  await pg.queryArray(sql);
  if(logSql) console.log(sql)
  //console.log("SQL file loaded successfully!");
}

export const pgClear = (...args: Client[]) => Promise.all(args.map(client => pgLoadSQLData(client, './data/postgres/clean.sql')))

export const pgLogTables = async (client: Client) => {
  const result = await client.queryObject(` SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public'   AND table_type = 'BASE TABLE';`);
  console.log("Tables:", result.rows);
}





interface HttpError extends Error {
  httpStatus?: number;
}

export const post = async (url: string, data: Record<string, unknown>) => {
  const response = await fetch(url, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  });
  if (!response.ok){
    const e: HttpError = new Error(`HTTP error! status: ${response.status}`);
    e.httpStatus = response.status;
    throw e;
  }
  return response.json();
}




export const drmCreateClient = async (args: Record<string, string> = {}, createFirstUserIfNone = true) => {

  const drm = {
    hostname : "http://localhost:9047",
    //endpoint : `${hostname}/api/v3`,
    userName : 'dremioUser',
    password : 'dremioPass1', // password needs a number, otherwise you will get error 403
    
    firstName : 'admin',
    lastName : '',
    email : 'luca.fabbian.1999@gmail.com',
    createdAt : Date.now(),
    token: '',
    
    ...args
  }

  if(createFirstUserIfNone){
    const response = await fetch(`${drm.hostname}/apiv2/bootstrap/firstuser`, {
      method: "PUT",
      headers: {
        "Authorization": '_dremionull',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: drm.userName, 
        password: drm.password, 
        firstName: drm.firstName, 
        lastName: drm.lastName, 
        email: drm.email, 
        createdAt: drm.createdAt
      }),
    });
    
    if (!response.ok ){
      if(response.status !== 400) throw new Error(`Unexpected HTTP error! status: ${response.status}`);
      console.log("User alredy there, no need to create a new one")
    }else{
      console.log("New user created", await response.json())
    }
  }

  const {token, expires } = await post(`${drm.hostname}/apiv2/login`, { userName: drm.userName, password: drm.password })
  console.log('Auth token:', token, '- expires at:', (new Date(expires)).toLocaleTimeString('en-GB'), '(30hours)')
  drm.token = token

  return drm
}

export type DremioClient = Awaited<ReturnType<typeof drmCreateClient>>

export const drmRefreshToken = async (drm: DremioClient) => {
  const {token, expires } = await post(`${drm.hostname}/apiv2/login`, { userName: drm.userName, password: drm.password })
  console.log('Auth token:', token, '- expires at:', (new Date(expires)).toLocaleTimeString('en-GB'), '(30hours)')
  drm.token = token
}

// helper function to make dremio api calls
export const drmApi = async(drm: DremioClient, method: 'GET'|'POST', url: string, data: Record<string, unknown>)  => {
  const response = await fetch(`${drm.hostname}/api/v3${url}`, {
      method,
      headers: {
          'Authorization': `Bearer ${drm.token}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  });

  if (!response.ok){
    const e: HttpError = new Error(`HTTP error! status: ${response.status}`);
    e.httpStatus = response.status;
    throw e;
  }
  return response.json();
}


export const drmSetupPostgres = async (drm: DremioClient, name: string, hostname = "postgres", port = "5432") => await drmApi(drm, 'POST', '/catalog', {
  entityType: 'source',
  type: "POSTGRES",
  name,
  config: {
      hostname,
      port,
      databaseName: "example",
      username: "user",
      password: "pass",
      authenticationType: "MASTER",
      fetchSize: 200,
      useSsl: false,
      encryptionValidationMode: "CERTIFICATE_AND_HOSTNAME_VALIDATION",
      maxIdleConns: 8,
      idleTimeSec: 60,
      queryTimeoutSec: 0
  },
})




export const ontopExec = async (options: {
  facts?: string,
  constraint?: string,
  dbMetadata?: string,
  dbDriver?: string,
  dbPassword?: string,
  dbUrl?: string,
  enableAnnotations?: boolean,
  factsBaseIri?: string,
  factsFormat?: string,
  lenses?: string,
  mapping: string,   // Required
  output?: string,
  properties?: string,
  query: string,     // Required
  sparqlRules?: string,
  ontology?: string,
  dbUser?: string,
  xmlCatalog?: string
}) => {
  const cmd = ["compose", "exec", "-u", "root",  "ontop", "ontop", "query"];

  if (options.facts) cmd.push("-a", options.facts);
  if (options.constraint) cmd.push("-c", options.constraint);
  if (options.dbMetadata) cmd.push("-d", options.dbMetadata);
  if (options.dbDriver) cmd.push("--db-driver", options.dbDriver);
  if (options.dbPassword) cmd.push("--db-password", options.dbPassword);
  if (options.dbUrl) cmd.push("--db-url", options.dbUrl);
  if (options.enableAnnotations) cmd.push("--enable-annotations");
  if (options.factsBaseIri) cmd.push("--facts-base-iri", options.factsBaseIri);
  if (options.factsFormat) cmd.push("--facts-format", options.factsFormat);
  if (options.lenses) cmd.push("-l", options.lenses);
  cmd.push("-m", options.mapping);  // Required field
  if (options.output) cmd.push("-o", options.output);
  if (options.properties) cmd.push("-p", options.properties);
  cmd.push("-q", options.query);  // Required field
  if (options.sparqlRules) cmd.push("--sparql-rules", options.sparqlRules);
  if (options.ontology) cmd.push("-t", options.ontology);
  if (options.dbUser) cmd.push("-u", options.dbUser);
  if (options.xmlCatalog) cmd.push("-x", options.xmlCatalog);

  // Run the command
  const command = new Deno.Command("docker", {
    args: cmd,
    stdout: "piped",
    stderr: "piped"
  });

  const { stdout } = await command.output();
  const decoder = new TextDecoder();
  return  decoder.decode(stdout)
  
  /*
  const error = await process.stderrOutput();
  if (error.length > 0) {
    console.error("Error:", decoder.decode(error));
    console.log("Output:", decoder.decode(output));

    return decoder.decode(error);
  } else {
    console.log("Output:", decoder.decode(output));
    return decoder.decode(output);
  }*/
}

export const ontopRunQuery = async (args: Record<string, string> = {}, queryString? : string) => {

  const outFile = uuid.v1.generate() + '-gitexclude.csv'
  const queryFile = uuid.v1.generate() + '-gitexclude.sparql'

  if(queryString) await Deno.writeTextFile(`./data/ontology/${queryFile}`, queryString)

  const res = await ontopExec({
    mapping: "/opt/ontop/input/1/mapping.ttl",
    query: `/opt/ontop/input/${queryFile}`,
    dbUrl: "jdbc:dremio:direct=dremio:31010",
    dbUser: "dremioUser",
    dbPassword: "dremioPass1",
    output: `/opt/ontop/input/${outFile}`,
    ...args
  });

  if(settings.debug) console.log(res)
  const text = await Deno.readTextFile(`./data/ontology/${outFile}`);
  await Deno.remove(`./data/ontology/${outFile}`);
  if(queryString) await Deno.remove(`./data/ontology/${queryFile}`)

  return text
}
