let i = 0;
function foo() {
    i = 1;
    let j = 2;
    if (true) {
        console.log(i); // 1
        console.log(j); // 2
    }
}
foo();