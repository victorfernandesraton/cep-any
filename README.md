# cep-any

[![build](https://github.com/victorfernandesraton/cep-any/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/victorfernandesraton/cep-any)
[![version](https://img.shields.io/npm/v/cep-any)](https://www.npmjs.com/package/cep-any)

A low dependency CEP lib

# WARNING: if you use node.js 17 or lower, see 1.3.0 version, 2.0.0 version breaking changes because fetch native has been in use

## Simple use

```js
const cep = require("cep-any");

cep.CepAny("41342315").them(console.log);
```

## Using factory and create a custonservice

```js
const { Factory, CepService } = require("cep-any");

class NewService extends CepService {
	handler = async (cep) => {
		return {
			cep: "88888888",
			city: "something",
			neighborhood: "something",
			street: "something",
			state: "AB",
		};
	};
}
const instanceService = new NewService("newService");
const facotry = Factory({
	useDefaultProviders: false,
	custonProviders: [instanceService],
});

facotry.execute("41342315").them(console.log);
```
