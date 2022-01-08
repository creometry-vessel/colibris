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
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IUser;
import com.esprit.go_recycle.models.Donneur;

public class SendEmail extends AppCompatActivity {
    ImageView logo;
    EditText Email;
    SharedPreferences shared;
    Button suivant;
    TextView envoyeremail;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_send_email);

        logo = findViewById(R.id.logo);
        Email = findViewById(R.id.email);

        suivant = findViewById(R.id.suivant);
        envoyeremail = findViewById(R.id.envoyeremail);
        suivant.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                IUser IUser = APIClient.getClient().create(IUser.class);
                IUser.sendemail(Email.getText().toString()).enqueue(new Callback<Donneur>() {
                    @Override
                    public void onResponse(Call<Donneur> call, Response<Donneur> response) {
                        Toast.makeText(getApplicationContext(), "Verifiez votre boite email ", Toast.LENGTH_LONG).show();
                        Log.v("email", "emailsended " +response.body().getAuthentification());
                        Intent intent = new Intent(getApplicationContext(), Resetpassword.class);
                        intent.putExtra("authen", String.valueOf(response.body().getAuthentification()));
                        intent.putExtra("email",Email.getText().toString());
                        startActivity(intent);


                    }

                    @Override
                    public void onFailure(Call<Donneur> call, Throwable t) {

                    }


                });
            }
        });
    }
}