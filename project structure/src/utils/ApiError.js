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

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
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

/*
if (stack) { this.stack = stack }

    This checks if a stack value was passed into the constructor (manually).

    If so, it uses that value.

🧠 Why?
Sometimes developers manually set a custom stack for special error handling (e.g., when rethrowing or wrapping an error).

Error.captureStackTrace() is a built-in V8 (Node.js) method that:

    Captures the current call stack (i.e., where the error was thrown),

    Assigns it to this.stack,

    Excludes the constructor function (this.constructor) from the trace, so it's cleaner.
*/