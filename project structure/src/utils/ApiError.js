class ApiError extends Error{
    constructor(
        statusCode,
        message = "something went wrong", //default messgae
        errors=[],
        stack = ""
    ){
        super(message) //"Hey, I'm creating a new error and this is the error message I want it to have."
        this.statusCode= statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors
    }
}

export {ApiError}

/*
| Term          | Meaning                                               |
| ------------- | ----------------------------------------------------- |
| `constructor` | A method that sets up initial properties of an object |
| Called by     | `new ClassName(...)`                                  |
| Purpose       | Initialize object with values                         |

*/

/*
Why only message in super()?

Because super() can only accept what the parent class constructor is built to handle.

The native Error class is only built to accept one argument: message.

Other values like statusCode, errors, success — those are custom properties you define after calling super():
*/