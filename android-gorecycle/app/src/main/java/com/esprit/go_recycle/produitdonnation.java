package com.esprit.go_recycle;

import androidx.appcompat.app.AppCompatActivity;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IDonnation;
import com.esprit.go_recycle.dao.IProduit;
import com.esprit.go_recycle.dao.IRamasseur;
import com.esprit.go_recycle.models.Donnation;
import com.esprit.go_recycle.models.Produit;
import com.esprit.go_recycle.models.solde;

import java.util.Calendar;
import java.util.Date;

public class produitdonnation extends AppCompatActivity {
Button btnajouter, moin ,plus ;
    ImageView imageView;
    TextView v1 ,v2,qte;
    SharedPreferences shared1,shared;

    private View.OnClickListener clicklistner=new View.OnClickListener() {
        @Override
        public void onClick(View view) {
          switch (view.getId()){
              case R.id.moin:
                  moin();
                  break;
              case R.id.plus:
                  plus();
                  break;
          }
        }
    };
    int i;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_produitdonnation);


        v1 = findViewById(R.id.pdt);
        v2 = findViewById(R.id.disc);
        qte = findViewById(R.id.qt);
        moin = findViewById(R.id.moin);
        plus = findViewById(R.id.plus);
        imageView = findViewById(R.id.imgp);
        Bundle extras = getIntent().getExtras();
        if (extras == null)
        {
            return;
        }
        int res = extras.getInt("image");
        final int solde=extras.getInt("solde");
        imageView.setImageResource(res);
        moin.setOnClickListener(clicklistner);
        plus.setOnClickListener(clicklistner);
        SharedPreferences prefs = getSharedPreferences("IdUser",
                MODE_PRIVATE);
        shared=getSharedPreferences("y",MODE_PRIVATE);

        final String string = prefs.getString("Key", null);
        v1.setText(getIntent().getStringExtra("name"));
        final int w=whatpType(v1.getText().toString());
        initcounter();

        final String disc = getIntent().getStringExtra("description");

        Log.v("dddhhhhh",""+v1.getText().toString());

        v2.setText(disc);
        qte.getText().toString();

        final String i=(qte.getText().toString());
        Log.v("dddhhhhh",""+i);
        final int x;



        Log.v("dd","the new score is"+solde);

        btnajouter = findViewById(R.id.btnajouter);
        btnajouter.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                IDonnation IUser = APIClient.getClient().create(IDonnation.class);
                IUser.adddonnation(Integer.parseInt(""+w),Integer.parseInt(string),Integer.parseInt(qte.getText().toString())).enqueue(new Callback<Donnation>() {
                    @Override
                    public void onResponse(Call<Donnation> call, Response<Donnation> response) {
                        Toast.makeText(getApplicationContext(), "Hello :" , Toast.LENGTH_LONG).show();

                    }

                    @Override
                    public void onFailure(Call<Donnation> call, Throwable t) {
                        Log.v("TAG!!!!!!!!!!!!!!!!!", "error" + t.getMessage());
                    }



                });

                IDonnation isolde = APIClient.getClient().create(IDonnation.class);
                isolde.updatescore(solde+(Integer.parseInt(qte.getText().toString())*10),solde,Integer.parseInt(string)).enqueue(new Callback<solde>() {
                    @Override
                    public void onResponse(Call<solde> call, Response<solde> response) {
                        AlertDialog.Builder builder = new AlertDialog.Builder(getApplicationContext());
                        int x=solde+(Integer.parseInt(qte.getText().toString())*10);
                        builder.setMessage("Votre nouveau score est "+x)
                                .setCancelable(false)
                                .setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                                    public void onClick(DialogInterface dialog, int id) {



                                        Toast.makeText(getApplicationContext(), "Hello :" , Toast.LENGTH_LONG).show();
                                        Intent intent = new Intent(getApplicationContext(), Listdonnation.class);
                                        intent.putExtra("data", "");
                                        // SharedPreferences.Editor editshared=shared1.edit();
                                        //editshared.putString("nouveauscore",""+(solde+(Integer.parseInt(qte.getText().toString())*10))).toString();
                                        Log.v("dd",""+(solde+(Integer.parseInt(qte.getText().toString())*10)));
                                        startActivity(intent);

                                    }
                                });


                        AlertDialog alert = builder.create();
                        alert.show();

                    }



                    @Override
                    public void onFailure(Call<solde> call, Throwable t) {
                        Log.v("TAG!!!!!!!!!!!!!!!!!", "error" + t.getMessage());
                    }



                });

            }
        });



    }









    private void initcounter(){
        i=1;
        qte.setText(i+"");

    }
    private void plus(){
        i++;
        qte.setText(i+"");
    }
    private void moin(){
        i--;
        qte.setText(i+"");


    }
    public int whatpType (String z){
        Log.v("ddd",""+z);
        String s1="Verre";
        int x = 0;
      if(s1.equals(z)){
          return  x=1;

      }else if ("Sachet".equals(z)){
          x=2;
      }else if ("Pille".equals(z)){
        x=3;
      }else if ("Carton".equals(z)){
          x=4;

    }else if ("Vetement".equals(z)){
        x=5;

    }else if
      ("Plastique".equals(z)){
              x=6;
          Log.v("ddd",""+x);
          }

        return x ;

    }




}