package com.esprit.go_recycle;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.esprit.go_recycle.models.Donnation;
import com.esprit.go_recycle.models.Message;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

public class MessageAdapter extends RecyclerView.Adapter {

private static final int TYPE_MESSAGE_SENT = 0;
private static final int TYPE_MESSAGE_RECEIVED = 1;
private static final int TYPE_IMAGE_SENT = 2;
private static final int TYPE_IMAGE_RECEIVED = 3;

private LayoutInflater inflater;
private List<JSONObject> messages = new ArrayList<>();
    private ArrayList<Message> msg=new ArrayList<>();
    private Context context;




public MessageAdapter (LayoutInflater inflater,Context context, ArrayList<Message> msg) {
        this.inflater = inflater;
        this.context=context;
        this.msg=msg;
        }

private class SentMessageHolder extends RecyclerView.ViewHolder {

    TextView messageTxt;

    public SentMessageHolder(@NonNull View itemView) {
        super(itemView);

        messageTxt = itemView.findViewById(R.id.sentTxt);
    }
}

private class SentImageHolder extends RecyclerView.ViewHolder {

    ImageView imageView;

    public SentImageHolder(@NonNull View itemView) {
        super(itemView);

        imageView = itemView.findViewById(R.id.imageView);
    }
}

private class ReceivedMessageHolder extends RecyclerView.ViewHolder {

    TextView nameTxt, messageTxt;

    public ReceivedMessageHolder(@NonNull View itemView) {
        super(itemView);

        nameTxt = itemView.findViewById(R.id.nameTxt);
        messageTxt = itemView.findViewById(R.id.receivedTxt);
    }
}

private class ReceivedImageHolder extends RecyclerView.ViewHolder {

    ImageView imageView;
    TextView nameTxt;

    public ReceivedImageHolder(@NonNull View itemView) {
        super(itemView);

        imageView = itemView.findViewById(R.id.imageView);
        nameTxt = itemView.findViewById(R.id.nameTxt);

    }
}

    @Override
    public int getItemViewType(int position) {
        /*String y = (String.valueOf(msg.get(position).getId_sender()));
        if (y.equals(2)) {
            return TYPE_MESSAGE_SENT;
        } else if(!y.equals(2)) {
            return TYPE_MESSAGE_RECEIVED;
        }else {*/
            JSONObject message = messages.get(position);
            try {
                if (message.getBoolean("isSent")) {

                    if (message.has("message"))
                        return TYPE_MESSAGE_SENT;
                    else
                        return TYPE_IMAGE_SENT;

                } else {

                    if (message.has("message"))
                        return TYPE_MESSAGE_RECEIVED;
                    else
                        return TYPE_IMAGE_RECEIVED;

                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
       /* }*/
        return -1;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View view;

        switch (viewType) {
            case TYPE_MESSAGE_SENT:
                view = inflater.inflate(R.layout.item_sent_message, parent, false);
                return new SentMessageHolder(view);
            case TYPE_MESSAGE_RECEIVED:

                view = inflater.inflate(R.layout.item_received_message, parent, false);
                return new ReceivedMessageHolder(view);

            case TYPE_IMAGE_SENT:

                view = inflater.inflate(R.layout.item_sent_image, parent, false);
                return new SentImageHolder(view);

            case TYPE_IMAGE_RECEIVED:

                view = inflater.inflate(R.layout.item_received_photo, parent, false);
                return new ReceivedImageHolder(view);

        }

        return null;
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
/*
for (int i=0;i<msg.size();i++){
   String y = (String.valueOf(msg.get(i).getId_sender()));
   if (y.equals(2)){
       SentMessageHolder messageHolder = (SentMessageHolder) holder;
       messageHolder.messageTxt.setText(msg.get(i).getText());
       Log.i("sender",(msg.get(i).getText()));
   }else{
       ReceivedMessageHolder messageHolder = (ReceivedMessageHolder) holder;
       messageHolder.nameTxt.setText(msg.get(i).getText());
       messageHolder.messageTxt.setText("Rammaseur");

   }
}*/


        JSONObject message = messages.get(position);
        Log.v("data","Message data"+msg);


        try {
            if (message.getBoolean("isSent")) {

                if (message.has("message")) {

                    SentMessageHolder messageHolder = (SentMessageHolder) holder;
                    messageHolder.messageTxt.setText(message.getString("message"));

                } else {

                    SentImageHolder imageHolder = (SentImageHolder) holder;
                    Bitmap bitmap = getBitmapFromString(message.getString("image"));

                    imageHolder.imageView.setImageBitmap(bitmap);

                }

            } else {

                if (message.has("message")) {

                    ReceivedMessageHolder messageHolder = (ReceivedMessageHolder) holder;
                    messageHolder.nameTxt.setText(message.getString("name"));
                    messageHolder.messageTxt.setText(message.getString("message"));

                } else {

                    ReceivedImageHolder imageHolder = (ReceivedImageHolder) holder;
                    imageHolder.nameTxt.setText(message.getString("name"));

                    Bitmap bitmap = getBitmapFromString(message.getString("image"));
                    imageHolder.imageView.setImageBitmap(bitmap);

                }

            }
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

    private Bitmap getBitmapFromString(String image) {

        byte[] bytes = Base64.decode(image, Base64.DEFAULT);
        return BitmapFactory.decodeByteArray(bytes, 0, bytes.length);
    }

    @Override
    public int getItemCount() {
        return messages.size();
    }

    public void addItem (JSONObject jsonObject) {
        messages.add(jsonObject);

        notifyDataSetChanged();
    }

}