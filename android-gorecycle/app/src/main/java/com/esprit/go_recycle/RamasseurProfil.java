package com.esprit.go_recycle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.loader.content.CursorLoader;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import android.Manifest;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.text.InputType;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IImage;
import com.esprit.go_recycle.dao.IRamasseur;
import com.esprit.go_recycle.dao.IUser;
import com.esprit.go_recycle.models.Adresse;
import com.esprit.go_recycle.models.Donneur;
import com.esprit.go_recycle.models.Ramasseur;
import com.squareup.picasso.Picasso;

import java.io.File;

public class RamasseurProfil extends AppCompatActivity {
TextView nom ,prenom ,num,email;
Button modifier , resetpass;

    String path;
    ImageView imageram;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ramasseur_profil);
        nom=findViewById(R.id.firstr);
        prenom=findViewById(R.id.lastr);
        num=findViewById(R.id.numramasseur);
        email=findViewById(R.id.email);
        modifier=findViewById(R.id.btnmodif);
        resetpass=findViewById(R.id.reset);
        imageram = findViewById(R.id.imageram);

        SharedPreferences prefs = getSharedPreferences("IdUser",
                MODE_PRIVATE);
        final String string = prefs.getString("idramasseur", null);
        final String url = prefs.getString("url", null);
        Log.v("the image url is","urllllll"+url);

        IImage image = APIClient.getClient().create(IImage.class);
        image.selctimage(Integer.parseInt(string)).enqueue(new Callback<Ramasseur>() {
            @Override
            public void onResponse(Call<Ramasseur> call, Response<Ramasseur> response) {
                Log.v("successssssssssssssssss", response.body().toString());
                Picasso.get().load("http://192.168.1.3:3006/image/uploads/"+response.body().getImage()).placeholder(R.drawable.vector).into(imageram);

            }

            @Override
            public void onFailure(Call<Ramasseur> call, Throwable t) {

            }


        });


        IRamasseur IUser = APIClient.getClient().create(IRamasseur.class);
        IUser.getramasseurprofil(Integer.parseInt(string)).enqueue(new Callback<Ramasseur>() {
            @Override
            public void onResponse(Call<Ramasseur> call, Response<Ramasseur> response) {
                Log.v("successssssssssssssssss", response.body().toString());
                nom.setText(response.body().getNom());
                prenom.setText(response.body().getPrenom());
                num.setText(response.body().getNum_tel());
                email.setText(response.body().getEmail());


            }

            @Override
            public void onFailure(Call<Ramasseur> call, Throwable t) {

            }


        });
        nom.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                nom.setCursorVisible(true);
                nom.setFocusableInTouchMode(true);
                nom.setInputType(InputType.TYPE_CLASS_TEXT);

                nom.requestFocus(); //to trigger the soft input);
            }
        });
        prenom.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                prenom.setCursorVisible(true);
                prenom.setFocusableInTouchMode(true);
                prenom.setInputType(InputType.TYPE_CLASS_TEXT);

                prenom.requestFocus(); //to trigger the soft input);
            }
        });
        num.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                num.setCursorVisible(true);
                num.setFocusableInTouchMode(true);
                num.setInputType(InputType.TYPE_CLASS_TEXT);

                num.requestFocus(); //to trigger the soft input);
            }
        });
        resetpass.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                IRamasseur IUser = APIClient.getClient().create(IRamasseur.class);
                IUser.sendemail(email.getText().toString()).enqueue(new Callback<Ramasseur>() {
                    @Override
                    public void onResponse(Call<Ramasseur> call, Response<Ramasseur> response) {
                        Toast.makeText(getApplicationContext(), "Verifiez votre boite email ", Toast.LENGTH_LONG).show();
                        Log.v("email", "emailsended " + response.body().getAuthentification());
                        Intent intent = new Intent(getApplicationContext(), Ramasseurpswd.class);
                        intent.putExtra("authen", String.valueOf(response.body().getAuthentification()));
                        intent.putExtra("email", email.getText().toString());
                        startActivity(intent);


                    }

                    @Override
                    public void onFailure(Call<Ramasseur> call, Throwable t) {

                    }


                });
            }
        });
        modifier.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                File file = new File(path);
                RequestBody reqFile = RequestBody.create(MediaType.parse("image/*"), file);
                MultipartBody.Part body = MultipartBody.Part.createFormData("upload", file.getName(), reqFile);
                RequestBody name = RequestBody.create(MediaType.parse("text/plain"), "upload");

                IImage IUser = APIClient.getClient().create(IImage.class);
                IUser.postImage(body,name).enqueue(new Callback<ResponseBody>() {
                    @Override
                    public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                        Toast.makeText(getApplicationContext(), "yeeeeeessss", Toast. LENGTH_SHORT).show();
                        Log.v("tag", "hiiiiiiii"+response.body());
                        Toast.makeText(getApplicationContext(), response.code() + " ", Toast.LENGTH_SHORT).show();


                    }

                    @Override
                    public void onFailure(Call<ResponseBody> call, Throwable t) {
                        Toast.makeText(getApplicationContext(), "nooo: "+t.getMessage(), Toast. LENGTH_SHORT).show();

                    }
                });
                IImage update = APIClient.getClient().create(IImage.class);
                update.updateimage(file.getName(), Integer.parseInt(string)).enqueue(new Callback<Ramasseur>() {
                    @Override
                    public void onResponse(Call<Ramasseur> call, Response<Ramasseur> response) {
                        Toast.makeText(getApplicationContext(), "yeeeeeessss", Toast. LENGTH_SHORT).show();
                        Log.v("tag", "imagesuccess aded"+response.body());


                    }

                    @Override
                    public void onFailure(Call<Ramasseur> call, Throwable t) {
                        Toast.makeText(getApplicationContext(), "nooo: "+t.getMessage(), Toast. LENGTH_SHORT).show();

                    }
                });

                IRamasseur up = APIClient.getClient().create(IRamasseur.class);
                up.updateramaaseur(nom.getText().toString(), prenom.getText().toString(), num.getText().toString(), Integer.parseInt(string)).enqueue(new Callback<Ramasseur>() {


                    @Override
                    public void onResponse(Call<Ramasseur> call, Response<Ramasseur> response) {

                        Intent intent = new Intent(getApplicationContext(), RamasseurProfil.class);


                        startActivity(intent);

                    }

                    @Override
                    public void onFailure(Call<Ramasseur> call, Throwable t) {

                    }
                });



            }
        });

        if (ContextCompat.checkSelfPermission(getApplicationContext(), Manifest.permission.WRITE_EXTERNAL_STORAGE)!=
                PackageManager.PERMISSION_GRANTED) {
            // Permission is not granted
            if (ActivityCompat.shouldShowRequestPermissionRationale(RamasseurProfil.this,
                    Manifest.permission.WRITE_EXTERNAL_STORAGE)) {

            } else {
                // No explanation needed; request the permission
                ActivityCompat.requestPermissions(RamasseurProfil.this,
                        new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},
                        1);
            }
        }

        // Picasso.get().load("http://localhost:3000/uploads/map.png").into(img);





        imageram.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent fintent = new Intent(Intent.ACTION_PICK);
                fintent.setType("image/*");
                try {
                    startActivityForResult(fintent, 200);
                } catch (ActivityNotFoundException e) {

                }
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (data == null)
            return;
        switch (requestCode) {
            case 200:
                if (resultCode == RESULT_OK) {
                    path = getPathFromURI(data.getData());
                    imageram.setImageURI(data.getData());


                }
        }
    }

    private String getPathFromURI(Uri contentUri) {
        String[] proj = {MediaStore.Images.Media.DATA};
        CursorLoader loader = new CursorLoader(getApplicationContext(),
                contentUri, proj, null, null, null);
        Cursor cursor = loader.loadInBackground();
        int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
        cursor.moveToFirst();
        return cursor.getString(column_index);
    }


    }

