package com.esprit.go_recycle;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.WebSocket;
import okhttp3.WebSocketListener;
import retrofit2.Call;
import retrofit2.Callback;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IEvenement;
import com.esprit.go_recycle.dao.IMessage;
import com.esprit.go_recycle.models.Evenement;
import com.esprit.go_recycle.models.Message;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class MessageActivity extends AppCompatActivity implements TextWatcher {
    private String name;
    private WebSocket webSocket;
    private String SERVER_PATH = "ws://192.168.1.3:3000/";
    private EditText messageEdit;
    private View sendBtn, pickImgBtn;
    private RecyclerView recyclerView;
    private int IMAGE_REQUEST_ID = 1;
    private MessageAdapter messageAdapter;
    private ArrayList<Message> me;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_message);


            name = "dora";
            initiateSocketConnection();

        }

        private void initiateSocketConnection() {

            OkHttpClient client = new OkHttpClient();
            Request request = new Request.Builder().url(SERVER_PATH).build();
            webSocket = client.newWebSocket(request, new SocketListener());

        }

        @Override
        public void beforeTextChanged(CharSequence s, int start, int count, int after) {

        }

        @Override
        public void onTextChanged(CharSequence s, int start, int before, int count) {

        }

        @Override
        public void afterTextChanged(Editable s) {

            String string = s.toString().trim();

            if (string.isEmpty()) {
                resetMessageEdit();
            } else {

                sendBtn.setVisibility(View.VISIBLE);
                pickImgBtn.setVisibility(View.INVISIBLE);
            }

        }

        private void resetMessageEdit() {

            messageEdit.removeTextChangedListener(this);

            messageEdit.setText("");
            sendBtn.setVisibility(View.INVISIBLE);
            pickImgBtn.setVisibility(View.VISIBLE);

            messageEdit.addTextChangedListener(this);

        }

        private class SocketListener extends WebSocketListener {

            @Override
            public void onOpen(WebSocket webSocket, Response response) {
                super.onOpen(webSocket, response);

                runOnUiThread(() -> {
                    Toast.makeText(MessageActivity.this,
                            "Socket Connection Successful!",
                            Toast.LENGTH_SHORT).show();

                    initializeView();
                });

            }

            @Override
            public void onMessage(WebSocket webSocket, String text) {
                super.onMessage(webSocket, text);

                runOnUiThread(() -> {

                    try {
                        JSONObject jsonObject = new JSONObject(text);
                        jsonObject.put("isSent", false);

                        messageAdapter.addItem(jsonObject);

                        recyclerView.smoothScrollToPosition(messageAdapter.getItemCount() - 1);

                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                });

            }
        }

        private void initializeView() {

            messageEdit = findViewById(R.id.messageEdit);
            sendBtn = findViewById(R.id.sendBtn);
            pickImgBtn = findViewById(R.id.pickImgBtn);

            recyclerView = findViewById(R.id.recyclerView);

            messageAdapter = new MessageAdapter(getLayoutInflater(),MessageActivity.this,me);
            recyclerView.setAdapter(messageAdapter);
            recyclerView.setLayoutManager(new LinearLayoutManager(this));

            IMessage IUser = APIClient.getClient().create(IMessage.class);
            IUser.getmeesage(2).enqueue(new Callback<List<Message>>() {
                @Override
                public void onResponse(Call<List<Message>> call, retrofit2.Response<List<Message>> response) {

                    if (response.isSuccessful()) {
                        me = new ArrayList<>(response.body());
                        messageAdapter = new MessageAdapter(getLayoutInflater(),MessageActivity.this, me);
                        recyclerView.setAdapter(messageAdapter);
                        Log.v("Data heey message", response.body().toString());


                    }

                }

                @Override
                public void onFailure(Call<List<Message>> call, Throwable t) {
                    Log.e("failure", t.getLocalizedMessage());

                }
            });
            messageEdit.addTextChangedListener(this);

            sendBtn.setOnClickListener(v -> {

                IMessage myad = APIClient.getClient().create(IMessage.class);
                myad.addMessage(messageEdit.getText().toString(),2,2).enqueue(new Callback<Message>() {


                    @Override
                    public void onResponse(Call<Message> call, retrofit2.Response<Message> response) {
                        Log.v("TAG!!!!!!!!!!!!!!!!!", "It works" );
                    }

                    @Override
                    public void onFailure(Call<Message> call, Throwable t) {
                        Log.v("TAG!!!!!!!!!!!!!!!!!", "error3" + t.getMessage());
                    }



                });


                JSONObject jsonObject = new JSONObject();
                try {
                    jsonObject.put("name", name);
                    jsonObject.put("message", messageEdit.getText().toString());

                    webSocket.send(jsonObject.toString());

                    jsonObject.put("isSent", true);
                    messageAdapter.addItem(jsonObject);

                    recyclerView.smoothScrollToPosition(messageAdapter.getItemCount() - 1);

                    resetMessageEdit();

                } catch (JSONException e) {
                    e.printStackTrace();
                }

            });

            pickImgBtn.setOnClickListener(v -> {

                Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
                intent.setType("image/*");

                startActivityForResult(Intent.createChooser(intent, "Pick image"),
                        IMAGE_REQUEST_ID);

            });

        }

        @Override
        protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
            super.onActivityResult(requestCode, resultCode, data);

            if (requestCode == IMAGE_REQUEST_ID && resultCode == RESULT_OK) {

                try {
                    InputStream is = getContentResolver().openInputStream(data.getData());
                    Bitmap image = BitmapFactory.decodeStream(is);

                    sendImage(image);

                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                }

            }

        }

        private void sendImage(Bitmap image) {

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            image.compress(Bitmap.CompressFormat.JPEG, 50, outputStream);

            String base64String = Base64.encodeToString(outputStream.toByteArray(),
                    Base64.DEFAULT);

            JSONObject jsonObject = new JSONObject();

            try {
                jsonObject.put("name", name);
                jsonObject.put("image", base64String);

                webSocket.send(jsonObject.toString());

                jsonObject.put("isSent", true);

                messageAdapter.addItem(jsonObject);

                recyclerView.smoothScrollToPosition(messageAdapter.getItemCount() - 1);

            } catch (JSONException e) {
                e.printStackTrace();
            }

        }
    }
