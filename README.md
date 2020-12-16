# miniInterpreter
Mini interpreter for simple custom commands using Deno (typescript)

# commands
add<br>
sub<br>
mul<br>
div<br>
clear<br>
print<br>
printAll<br>

# variables
c1...c5
# commands examples
add c1 5<br>
sub c3 20<br>
print c1<br>
mul c2 5<br>
printAll

# process arguments
if no arguments is given to the process then it will take input from user and print it to the console
if 1 argument is given to the process then it will read the argument as the input text
if 2 argument is given to the process then it will read the first argument as the input text and the second argument as the output text

# arguments examples
deno run index.tx
deno run --allow-read index.ts ./input.txt
deno run --allow-read --allow-write index.ts ./input.txt ./output.txt  
deno run --allow-all index.ts ./input.txt ./output.txt  
