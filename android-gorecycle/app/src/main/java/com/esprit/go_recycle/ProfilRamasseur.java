package com.esprit.go_recycle;

import androidx.appcompat.app.AppCompatActivity;

import android.Manifest;
import android.annotation.TargetApi;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.ActivityNotFoundException;
import android.content.ComponentName;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Parcelable;
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
import com.esprit.go_recycle.dao.IUser;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.loader.content.CursorLoader;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

import static android.Manifest.permission.CAMERA;
import static android.Manifest.permission.READ_EXTERNAL_STORAGE;
import static android.Manifest.permission.WRITE_EXTERNAL_STORAGE;

public class ProfilRamasseur extends AppCompatActivity {
    TextView nomprenom,adresse,numero,code;

    ImageView imageram;
    Button save;
    private ArrayList<String> permissionsToRequest;
    private ArrayList<String> permissionsRejected = new ArrayList<>();
    private ArrayList<String> permissions = new ArrayList<>();
    private final static int ALL_PERMISSIONS_RESULT = 107;
    private final static int IMAGE_RESULT = 200;
    Bitmap mBitmap;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profil_ramasseur);

        nomprenom = findViewById(R.id.firstlastname);
        imageram = findViewById(R.id.imageram);
        nomprenom.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                nomprenom.setCursorVisible(true);
                nomprenom.setFocusableInTouchMode(true);
                nomprenom.setInputType(InputType.TYPE_CLASS_TEXT);

                nomprenom.requestFocus(); //to trigger the soft input);
            }
        });
        adresse = findViewById(R.id.adresseramasseur);
        adresse.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                adresse.setCursorVisible(true);
                adresse.setFocusableInTouchMode(true);
                adresse.setInputType(InputType.TYPE_CLASS_TEXT);

                adresse.requestFocus(); //to trigger the soft input);
            }
        });
        numero = findViewById(R.id.numramasseur);
        numero.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                numero.setCursorVisible(true);
                numero.setFocusableInTouchMode(true);
                numero.setInputType(InputType.TYPE_CLASS_TEXT);

                numero.requestFocus(); //to trigger the soft input);
            }
        });
        code = findViewById(R.id.codetravailleur);
        code.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                code.setCursorVisible(true);
                code.setFocusableInTouchMode(true);
                code.setInputType(InputType.TYPE_CLASS_TEXT);

                code.requestFocus(); //to trigger the soft input);
            }
        });

        save = findViewById(R.id.btnsave);

    }

}


