package com.esprit.go_recycle;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.ImageView;

public class MainActivity extends AppCompatActivity {
ImageView logo;
Button commencer;
private SharedPreferences mPreferences;
Animation top ,bottom ;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_main);
        mPreferences = getSharedPreferences("IdUser", MODE_PRIVATE);
        logo=(ImageView)findViewById(R.id.logo);
        commencer=(Button)findViewById(R.id.commencer);
        //declarer animation
        top= AnimationUtils.loadAnimation(this,R.anim.fromtop);
        bottom= AnimationUtils.loadAnimation(this,R.anim.frombottom);
        //attribuer des animations a des objets
        logo.setAnimation(top);
        commencer.setAnimation(bottom);
        if (mPreferences.contains("Key")) {
            Intent intent = new Intent(MainActivity.this, AccueilDonneur.class);
            startActivity(intent);
        }
        if (mPreferences.contains("idramasseur")) {
            Intent intent = new Intent(MainActivity.this, AccueilRamasseur.class);
            startActivity(intent);
        }
        if (mPreferences.contains("id_sponsor")) {
            Intent intent = new Intent(MainActivity.this, AccueilSponsor.class);
            startActivity(intent);
        }


        commencer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), login.class);
                startActivity(intent);

            }
        });

}
}