INSERT INTO programming_assignments (title, assignment_order, handout, test_code) VALUES ('Hello', 1, 'Write a function "hello" that returns the string "Hello"', 'import socket
def guard(*args, **kwargs):
  raise Exception("Internet is bad for you :|")
socket.socket = guard

import unittest
from code import *

class TestHello(unittest.TestCase):

  def test_hello(self):
    self.assertEqual(hello(), "Hello", "Function should return \"Hello\"")
');

INSERT INTO programming_assignments (title, assignment_order, handout, test_code) VALUES ('Hello world', 2, 'Write a function "hello" that returns the string "Hello world!"', 'import socket
def guard(*args, **kwargs):
  raise Exception("Internet is bad for you :|")
socket.socket = guard

import unittest
from code import *

class TestHello(unittest.TestCase):

  def test_hello(self):
    self.assertEqual(hello(), "Hello world!", "Function should return \"Hello world!\"")
');

INSERT INTO programming_assignments (title, assignment_order, handout, test_code) VALUES ('Sum', 3, 'Write a function "sum" that takes two numbers as parameters and returns their sum.', 'import socket
def guard(*args, **kwargs):
  raise Exception("Internet is bad for you :|")
socket.socket = guard

import unittest
from code import *

class TestHello(unittest.TestCase):

  def test_sum_1(self):
    self.assertEqual(sum(2, 4), 6, "Call sum(2, 4) should return 6.")

  def test_sum_2(self):
    self.assertEqual(sum(40, 2), 42, "Call sum(40, 2) should return 42.")
');