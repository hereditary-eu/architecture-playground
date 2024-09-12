# HEREDITARY-architecture-playground

This repository includes a set of templates you can copy-paste to experiment with different setups.
Each folder includes some mock data, a `docker-compose.yml` file, and a `playground.ipynb` notebook with some scripts and tests.

```bash
cd folder/   # Replace with the actual folder
docker compose up
```

**ontop-dremio:** this is the place I'm working on right now, a playground with battery includes to test dremio + ontop using javascript notebooks

**graphdb-dremio:** the "standard" infrastructure proposed by Mirco Cazzaro in his thesis <https://hereditary.dei.unipd.it/wiki/doku.php?id=groups:semanticmodelling>

**ontop-h2-minimal:** minimal setup to test ontop using the small database h2 (as suggested inside ontop tutorial); it's arguably the smallest setup to test a relational->graph conversion.

