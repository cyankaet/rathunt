.PHONY: test check

build:
	dune build src

utop:
	OCAMLRUNPARAM=b dune utop src

zip:
	zip -r hello.zip . -x _build/\* .git/\*

clean:
	dune clean
	rm -f hello.zip
