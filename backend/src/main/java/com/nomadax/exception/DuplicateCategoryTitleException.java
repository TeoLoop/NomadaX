package com.nomadax.exception;

public class DuplicateCategoryException extends RuntimeException {
  public DuplicateCategoryException(String message) {
    super(message);
  }
}
