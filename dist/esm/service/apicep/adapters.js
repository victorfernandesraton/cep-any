export function responseToCep(data) {
    var _a;
    return {
        cep: data.code.replaceAll("-", ""),
        city: data.city,
        state: data.state,
        neighborhood: (_a = data.district) !== null && _a !== void 0 ? _a : "",
        street: data.address,
    };
}
