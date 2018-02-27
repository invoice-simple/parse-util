# parse-util


## Goals
- return real promise, not Parse Promise
- normalize error handling across all Parse.Object functions
- light wrapper, low maintenance, minimal code
- should provide same API as parse-server to allow docs reuse
- expose available Parse Objects (tables)
- client should not need to import 'parse' wrapper to provide access via parseUtil
