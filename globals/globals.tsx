class Globals {}
//let URL: string = "http://10.0.0.140:3400/";
// let URL: string = "http://172.17.0.6:80/";
let URL: string = "http://143.47.232.141:9050/";

class DevelopmentGlobals extends Globals {
  public urls = {
    picthepac: URL + "",
    login: URL + "login",
    deliveries: URL + "deliveries/",
    extensions: URL + "extensions/"
    // picthepacMongo: URLMongo + "picthepac/"
  };
}

class ProductionGlobals extends Globals {
  public urls = {
    picthepac: URL + "",
    login: URL + "login",
    deliveries: URL + "deliveries/",
    extensions: URL + "extensions/"
    // picthepacMongo: URLMongo + "picthepac/"
  };
}

const globals =
  process.env.NODE_ENV === "production"
    ? new ProductionGlobals()
    : new DevelopmentGlobals();

export default globals;
