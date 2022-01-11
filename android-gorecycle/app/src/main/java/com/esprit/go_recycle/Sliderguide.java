package com.esprit.go_recycle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;
import androidx.viewpager2.widget.ViewPager2;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;

import java.util.ArrayList;
import java.util.List;

public class Sliderguide extends AppCompatActivity {

    private SliderAdapter adapterslider;
    private Button passer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sliderguide);
        passer=(Button)findViewById(R.id.button);
        final   String  ff=getIntent().getStringExtra("data");
        passer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), AccueilDonneur.class);
                intent.putExtra("data",ff);
                startActivity(intent);
            }
        });
        setupSliderItems();
        ViewPager2  sliderviewpager=findViewById(R.id.viewpager);
        sliderviewpager.setAdapter(adapterslider);
    }
        private void setupSliderItems() {
            List  <SliderItem> sliderItems=new ArrayList<>();
            SliderItem itemStocker=new SliderItem();

            itemStocker.setImage(R.drawable.s1);
            itemStocker.setTitre("Stocker");
            itemStocker.setDescription("Go_recycle vous permet de créer un\n" +
                    " lien entre vous et le collecteur des\n" +
                            "Objets recyclable, pour commencer et \n" +
                            "essayer, stocker une quantité ");
            SliderItem itemCollecter=new SliderItem();
            itemCollecter.setImage(R.drawable.s2);
            itemCollecter.setTitre("Collecter");
            itemCollecter.setDescription("Go_recycle vous permet de créer un\n" +
                    " lien entre vous et le collecteur des\n" +
                    "Objets recyclable, pour commencer et \n" +
                    "essayer, stocker une quantité ");
            SliderItem itemRecycler=new SliderItem();
            itemRecycler.setImage(R.drawable.s3);
            itemRecycler.setTitre("Recycler");
            itemRecycler.setDescription("Go_recycle vous permet de créer un\n" +
                    " lien entre vous et le collecteur des\n" +
                    "Objets recyclable, pour commencer et \n" +
                    "essayer, stocker une quantité ");
            sliderItems.add(itemStocker);
            sliderItems.add(itemCollecter);
            sliderItems.add(itemRecycler);

            adapterslider= new SliderAdapter(sliderItems);
        }


    }
