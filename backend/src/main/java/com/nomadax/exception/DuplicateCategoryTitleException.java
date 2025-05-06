package com.nomadax.exception;

public class DuplicateCategoryTitleException extends RuntimeException {
    public DuplicateCategoryTitleException(String message) {
        super(message);
    }
}
