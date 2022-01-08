package com.esprit.go_recycle;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import android.app.DatePickerDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IEvenement;
import com.esprit.go_recycle.dao.IUser;
import com.esprit.go_recycle.models.Adresse;
import com.esprit.go_recycle.models.Donneur;
import com.esprit.go_recycle.models.Evenement;
import com.esprit.go_recycle.models.Participation;

import java.util.Calendar;

public class DetailsCreation extends AppCompatActivity {
    Button supprimer,modifier;
    EditText eventnom,eventad,eventdate;

    DatePickerDialog datePickerDialog;
    int year;
    int month;
    int dayOfMonth;
    Calendar calendar;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_details_creation);
        modifier=findViewById(R.id.modifier);
        supprimer=findViewById(R.id.supprimer);
        eventnom=findViewById(R.id.eventnom);
        eventad=findViewById(R.id.eventadresse);
        eventdate=findViewById(R.id.eventdate);
        eventdate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                calendar = Calendar.getInstance();
                year = calendar.get(Calendar.YEAR);
                month = calendar.get(Calendar.MONTH);
                dayOfMonth = calendar.get(Calendar.DAY_OF_MONTH);
                datePickerDialog = new DatePickerDialog(DetailsCreation.this,
                        new DatePickerDialog.OnDateSetListener() {
                            @Override
                            public void onDateSet(DatePicker datePicker, int year, int month, int day) {
                                eventdate.setText(day + "/" + (month + 1) + "/" + year);
                            }
                        }, year, month, dayOfMonth);
                datePickerDialog.getDatePicker().setMinDate(System.currentTimeMillis());
                datePickerDialog.show();
            }
        });
        SharedPreferences prefs = getSharedPreferences("IdUser",
                MODE_PRIVATE);
        final String string = prefs.getString("Key", null);
        final   String  data=getIntent().getStringExtra("id_evenemnt");

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

        supprimer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                AlertDialog.Builder builder = new AlertDialog.Builder(DetailsCreation.this);
                builder.setMessage("Vous etes sur de supprimer cet evenement ?")
                        .setCancelable(false)
                        .setPositiveButton("OUI", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {


                                IEvenement myp = APIClient.getClient().create(IEvenement.class);
                                myp.deleteevent(Integer.parseInt(data)).enqueue(new Callback<Evenement>() {
                                    @Override
                                    public void onResponse(Call<Evenement> call, Response<Evenement> response) {
                                        Intent intent = new Intent(getApplicationContext(), ListCreation.class);
                                        Log.v("youhou  evenets deleted ","goood evnet was deleted ");
                                        startActivity(intent);

                                    }

                                    @Override
                                    public void onFailure(Call<Evenement> call, Throwable t) {
                                        Log.v("TAG", "error" + t.getMessage());
                                        Intent intent = new Intent(getApplicationContext(), ListCreation.class);
                                        startActivity(intent);
                                    }
                                });

                            }
                        })
                        .setNegativeButton("Non", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {
                                dialog.cancel();
                            }
                        });
                AlertDialog alert = builder.create();
                alert.show();


            }
        });
        modifier.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                IEvenement up = APIClient.getClient().create(IEvenement.class);
                up.updateevent(eventnom.getText().toString(), eventad.getText().toString(), eventdate.getText().toString(), Integer.parseInt(data)).enqueue(new Callback<Evenement>() {


                    @Override
                    public void onResponse(Call<Evenement> call, Response<Evenement> response) {

                        Intent intent = new Intent(getApplicationContext(), ListCreation.class);
                        startActivity(intent);

                    }

                    @Override
                    public void onFailure(Call<Evenement> call, Throwable t) {

                    }
                });
            }
        });





    }
}