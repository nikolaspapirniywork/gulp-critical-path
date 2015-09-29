##Plugin to extract critical path css code to separate file(manually). Then this file should be inlined to header of the page##

You should mark css class with some identifier like '.my-class---critical'

Then when calling this plugin from gulp, pass this identifier:

.pipe(criticalPath({criticalClasses: '---critical'}))


###To set up project:### 

* npm install

###To run tests (from project's root):###
 
* mocha