package com.esprit.go_recycle.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Message {
    @SerializedName("id")
    @Expose
    private int id_message;
    @SerializedName("text")
    @Expose
    private String text;
    @SerializedName("id_sender")
    @Expose
    private int id_sender;

    @SerializedName("id_donnation")
    @Expose
    private int id_donnation;

    public int getId_message() {
        return id_message;
    }

    public void setId_message(int id_message) {
        this.id_message = id_message;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getId_sender() {
        return id_sender;
    }

    public void setId_sender(int id_sender) {
        this.id_sender = id_sender;
    }

    public int getId_donnation() {
        return id_donnation;
    }

    public void setId_donnation(int id_donnation) {
        this.id_donnation = id_donnation;
    }

    @Override
    public String toString() {
        return "Message{" +
                "id_message=" + id_message +
                ", text='" + text + '\'' +
                ", id_sender=" + id_sender +
                ", id_donnation=" + id_donnation +
                '}';
    }
}
