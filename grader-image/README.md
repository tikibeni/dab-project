# A grader image for grading Python code - 8c8e4482-eac9-449f-830f-7f9a97bb7a53

The image should be used as a base for subsequent images. When programmatically
building an image out of the base, copy the base as a new image, and copy the
files `test-code.py` and `code.py` into the `/app/submission` folder of the new
image. Running the new image executes the test code written to `test-code.py`
and outputs the test results into the file `result.data` in th `/app/submission`
folder.

Once the grading is done, contents from `/app/submission/result.data` can be
read, and the new image can be removed.

The base grader image can be built using either the `build.sh` command or the
`docker build -t grader-image .` command in the `grader-image` folder. Having
the base grader image, i.e. `grader-image` is needed for programmatically
building subsequent grading images.

Overall, when grading, there are four broad possibilities for the grading
outcome:

- Tests are run and they pass (i.e. grading is successful)
- Tests are run and they fail (i.e. grading failed)
- Tests cannot be run due to a syntax error (i.e. syntax error in code)
- Tests time out and no output is given (i.e. there's an infinite loop in code
  or tests)
