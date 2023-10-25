#!/bin/bash

cd /app/submission/

PYTHONUNBUFFERED=1 timeout 10 python3 -m unittest test-code.py > program-output.out 2> grading-output.out
mv grading-output.out /app/submission/result.data
