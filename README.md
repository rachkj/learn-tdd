# JEST tutorial for test-driven development
Learn how to write unit tests and other kinds of tests

# Setup

Install dependencies

`$ npm install`

Run tests

`$ NODE_ENV=test npx jest /path/to/test/file`

Run coverage

`$ NODE_ENV=test npx jest --coverage /path/to/test/file`

View coverage report in `coverage/lcov-report/index.html`

**Windows Note**: If you are on Windows and the above commands do not run
because of NODE_ENV not recognized then first set the environment variable from the terminal using `SET NODE_ENV=test` and then
run the jest command `npx jest --covereage /path/to/test/file`. The coverage is optional.

The followung database scripts are not necessary. If you still need
them for manual testing here they are:

`$ npx ts-node insert_sample_data.ts "mongodb://127.0.0.1:27017/my_library_db"`

Clean the database

`npx ts-node remove_db.ts "mongodb://127.0.0.1:27017/my_library_db"`

# Description

This repository illustrates how to use jest to write unit tests 
for a server in typescript. The examples are as follows:

- `tests/authorSchema.test.ts`: Unit tests to verify the schema of the authors colletion. 
- `tests/bookDetailsService.test.ts`: Unit tests to verify the behavior of the service that is used to retrieve the details of a particular book.
- `tests/createBookService.test.ts`: Unit tests to verify if a book is created successfully.

# For you to do

## Part 1

Write a unit test for the GET /authors service. 
The service should respond with a list of author names and lifetimes sorted by family name of the authors. It should respond
with a "No authors found" message when there are no authors in the database. If an error occurs when retrieving the authors then the
service responds with an error code of 500. The unit test
should be placed in `tests/authorService.test.ts`.

## Part 2

Briefly explain a limitation of the tests in `tests/authorSchema.test.ts` in the space below.

A key limitation of the tests in `tests/authorService.test.ts` is that they rely heavily on **mocking** the `Author` model, which isolates the tests from real database interactions. While this is useful for unit testing, it doesn't guarantee that the database query logic itself is functioning correctly. 

For example:
- If the actual `Author.getAllAuthors()` query has a syntax error, incorrect schema reference, or returns unexpected data structures, these tests would still pass since they only test the mocked behavior.
  
To address this, adding **integration tests** that query a test database would provide better coverage for end-to-end functionality.



## Part 3

Generate the coverage report for the tests you wrote. How can you improve
your tests using the coverage report? Briefly explain your 
process in the space below.

Covergae report:
kj@Rachanas-MacBook-Air learn-tdd % NODE_ENV=test npx jest --coverage tests/authorService.test.ts
 PASS  tests/authorService.test.ts
  GET /authors
    ✓ should return a list of authors sorted by family name (10 ms)
    ✓ should return "No authors found" when there are no authors (2 ms)
    ✓ should return a 500 status code when there is an error (3 ms)

-------------|---------|----------|---------|---------|--------------------------------
File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s              
-------------|---------|----------|---------|---------|--------------------------------
All files    |   46.66 |    13.33 |      25 |   46.51 |                                
 models      |   27.27 |        0 |       0 |   28.12 |                                
  author.ts  |   27.27 |        0 |       0 |   28.12 | 56-63,74-82,92,102-109,119-123 
 pages       |     100 |      100 |     100 |     100 |                                
  authors.ts |     100 |      100 |     100 |     100 |                                
-------------|---------|----------|---------|---------|--------------------------------
Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.614 s, estimated 2 s
Ran all test suites matching /tests\/authorService.test.ts/i.
kj@Rachanas-MacBook-Air learn-tdd % 

Based on the coverage, we can find out thelines of code that are not covered by the tests and add tests for them to ensure a more robust system that handles all edge cases and success scenarios as expected. 
- Add targeted tests for missing conditions and functions in author.ts.
- Focus on covering error handling, alternate data flows, and boundary conditions.
- Rerun coverage reports frequently to measure progress.


