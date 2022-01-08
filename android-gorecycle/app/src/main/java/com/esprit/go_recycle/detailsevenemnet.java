package com.esprit.go_recycle;

import androidx.appcompat.app.AppCompatActivity;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IEvenement;
import com.esprit.go_recycle.dao.IUser;
import com.esprit.go_recycle.models.Donneur;
import com.esprit.go_recycle.models.Evenement;
import com.esprit.go_recycle.models.Participation;

public class detailsevenemnet extends AppCompatActivity {
Button participerevent;
EditText eventnom,eventad,eventdate;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detailsevenemnet);
        participerevent=findViewById(R.id.participerevent);
        eventnom=findViewById(R.id.eventnom);
        eventad=findViewById(R.id.eventadresse);
        eventdate=findViewById(R.id.eventdate);
        SharedPreferences prefs = getSharedPreferences("IdUser",
                MODE_PRIVATE);
        final String string = prefs.getString("Key", null);
        final   String  data=getIntent().getStringExtra("data");

        IEvenement IUser = APIClient.getClient().create(IEvenement.class);
        IUser.getunevent(Integer.parseInt(data)).enqueue(new Callback<Evenement>() {
            @Override
            public void onResponse(Call<Evenement> call, Response<Evenement> response) {
                Log.v("successssssssssssssssss", response.body().toString());
                eventnom.setText(response.body().getNom());
                eventad.setText(response.body().getLieu());
                eventdate.setText(response.body().getDate());
            }

            @Override
            public void onFailure(Call<Evenement> call, Throwable t) {

            }


        });

        participerevent.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                IEvenement myp = APIClient.getClient().create(IEvenement.class);
                myp.addpart(Integer.parseInt(data),Integer.parseInt(string),"PARTIPATOR").enqueue(new Callback<Participation>() {
                    @Override
                    public void onResponse(Call<Participation> call, Response<Participation> response) {
                        Intent intent = new Intent(getApplicationContext(), ListEvenement.class);
                        Log.v("youhou participated avents","goood");
                        startActivity(intent);

                    }

                    @Override
                    public void onFailure(Call<Participation> call, Throwable t) {
                        Log.v("TAG", "error" + t.getMessage());
                        Intent intent = new Intent(getApplicationContext(), ListEvenement.class);
                        Log.v("youhou aded avents","eror");
                        startActivity(intent);
                    }
                });

            }
        });



    }
}