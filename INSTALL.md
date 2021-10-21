# Installing and Building RatHunt
RatHunt is a puzzlehunt web app created with OCaml, Bucklescript, and Bucklescript-TEA. The majority of the actual written code is in OCaml, which is compiled into JavaScript via Bucklescript. 

## OPAM Packages
Bucklescript runs on an older version of the OCaml compiler, one that is unsupported by the version supported by CS 3110. In particular, the most up-to-date compiler is version 4.12, but Bucklescript uses version 4.06.1.  Technically, this isn't strictly necessary for building the project, but if one were to create a development environment to change any of these files, they would need to create a new switch for this project. If you have OPAM installed, then you will need to run the following command to create a switch: 
```
opam switch create rathunt ocaml-base-compiler.4.06.1 
```
and the necessary packages: 
```
opam install ocaml-lsp-server.1.4.1 ocamlformat react utop
```
## JavaScript 
To install the necessary JavaScript dependencies, you will first need to install `npm`, which is the Node Packages Manager that will help with everything else. In Ubuntu, these are the commands to install npm (this may vary on other distributions):
```
sudo apt update
sudo apt install nodejs npm
```
Now, for ease of managing the actual app, we install `yarn` as well, which will be installed through `npm` with 
```
npm install yarn
```
`yarn` will help with installing all the necessary libraries, which are already included in the `package.json` file. Run `yarn install` to install of these dependencies. 

Finally, build the project with ```make build```. This should complete the setup of RatHunt.

## Local Hosting
In the project directory, you can run `make run`, which will display the current state of the web app in `localhost:5000`. 