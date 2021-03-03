   // const { Pact } = require("@pact-foundation/pact")
const path = require("path")
const chai = require("chai")
const { Pact } = require("@pact-foundation/pact")
const chaiAsPromised = require("chai-as-promised")
const { get } = require("http")
const expect = chai.expect
chai.use(chaiAsPromised)

describe('Consumer Test', () => {
    // (1) create the pact object to represent your provider
    const provider = new Pact({
        consumer: "helloworld",
        provider: "helloworldApi",
        port: 1234,
        log: path.resolve(process.cwd(), "logs", "pact.log"),
        dir: path.resolve(process.cwd(), "pacts"),
        logLevel: "INFO",
        
    });
    // we need to setup the provider instance
    before(() => provider.setup()
    // after provider have been setup, then we can setup our interactions
    .then(() => provider.addInteraction({
        state: "a request to get Hello World",
        uponReceiving: "helloworld",
        withRequest: {
            method: "GET",
            path: "/",
            headers: { Accept: "application/json,text/plain, */*" },
        },
        willRespondWith: {
            status: 200,
            headers: { "Content-Type": "application/json"},
            body: "Hello World",
        }
    })))
    it('OK response', () => {
        // get()
        // .then((respose) => {
        //    expect(response.statusText).to.be.equal('OK')
        // })
    })
    afterEach(() => provider.verify())   

    after(() => provider.finalize)
})
