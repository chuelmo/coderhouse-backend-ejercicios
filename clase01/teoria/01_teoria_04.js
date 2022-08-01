function foo() {
    if (true) {
        let i = 1;
    }
    // ReferenceError: i is not defined
    console.log(i);
}
foo();