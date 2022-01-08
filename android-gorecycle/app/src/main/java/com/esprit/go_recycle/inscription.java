package com.esprit.go_recycle;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IUser;
import com.esprit.go_recycle.models.Donneur;

public class inscription extends AppCompatActivity {
EditText nom,prenom,num;
Button suivant;
TextView connectview;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inscription);


        nom=findViewById(R.id.nom);
        prenom=findViewById(R.id.prenom);
        num=findViewById(R.id.numtel);
        suivant=(Button)findViewById(R.id.suivant);
        connectview=(TextView)findViewById(R.id.dejacompte);
        connectview.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(getApplicationContext(), login.class);
                startActivity(intent);
            }
        });
        suivant.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (verifyIfEditTextIsFilled(nom, prenom, num)) {
                    IUser IUser = APIClient.getClient().create(IUser.class);

                    IUser.CheckTel(num.getText().toString()).enqueue(new Callback<Donneur>() {

                        @Override
                        public void onResponse(Call<Donneur> call, Response<Donneur> response) {

                            Log.v("TAG!!!!!!!!!!!!!!!!!", "error" + response.body());
                            if (response.body().getNum_tel().equals("0")) {

                                Intent intent = new Intent(getApplicationContext(), secondinscription.class);

                                intent.putExtra("nom", nom.getText().toString());
                                intent.putExtra("prenom", prenom.getText().toString());
                                intent.putExtra("num", num.getText().toString());

                                startActivity(intent);
                                startActivity(intent);
                            } else {
                                AlertDialog alertDialog = new AlertDialog.Builder(inscription.this).create();
                                alertDialog.setTitle("Alert");
                                alertDialog.setMessage("Le numero telephone  existe deja ");
                                alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK",
                                        new DialogInterface.OnClickListener() {
                                            public void onClick(DialogInterface dialog, int which) {
                                                dialog.dismiss();
                                            }
                                        });
                                alertDialog.show();
                            }
                        }


                        @Override
                        public void onFailure(Call<Donneur> call, Throwable t) {
                            // Toast.makeText(getApplicationContext(), "Échec de l'authentification", Toast.LENGTH_LONG).show();
                            Log.v("TAG!!!!!!!!!!!!!!!!!", "woooooherror" + t.getMessage());


                        }
                    });


                }
            }
        });

    }


    private boolean verifyIfEditTextIsFilled(EditText... editText) {

        boolean result = true;

        for (EditText text : editText) {

            if (text.getText().toString().isEmpty()) {
                final View focusView = text;
                text.setError("Veuillez remplir tous les champs");
                focusView.requestFocus();
                result = false;
            }
        }
        return result;
    }
}