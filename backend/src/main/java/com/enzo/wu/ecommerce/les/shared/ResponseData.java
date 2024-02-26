package com.enzo.wu.ecommerce.les.shared;

import lombok.Getter;

@Getter
public class ResponseData<T> {
    private Boolean success;
    private String error;
    private T data;

    public ResponseData() {
        this.success = true;
        this.error = null;
        this.data = null;
    }

    public ResponseData(T data) {
        this.success = true;
        this.error = null;
        this.data = data;
    }

    public ResponseData(String error) {
        this.success = false;
        this.error = error;
        this.data = null;
    }

    public Boolean hasError() {
        return !this.success;
    }
}
