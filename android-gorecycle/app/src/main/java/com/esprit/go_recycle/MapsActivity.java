package com.esprit.go_recycle;

import androidx.fragment.app.FragmentActivity;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import android.app.ProgressDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IRamasseur;
import com.esprit.go_recycle.dao.IUser;
import com.esprit.go_recycle.models.Adresse;
import com.esprit.go_recycle.models.Listlocation;
import com.esprit.go_recycle.models.Map;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;

import java.util.ArrayList;
import java.util.List;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    private GoogleMap nmap;
    private List<Map> mListMarker = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

    }

    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    @Override
    public void onMapReady(final GoogleMap googleMap) {
        mMap = googleMap;
        nmap = googleMap;
        SharedPreferences prefs = getSharedPreferences("IdUser",
                MODE_PRIVATE);
        final String string = prefs.getString("idramasseur", null);
        IRamasseur myad = APIClient.getClient().create(IRamasseur.class);
        myad.getmapcord().enqueue(new Callback<List<Map>>() {
            @Override
            public void onResponse(Call<List<Map>> call, Response<List<Map>> response) {
                for(int i = 0; i<(response.body().size()); i++) {

                    Log.v("yees","yees"+response.body().size());
                    Log.v("yees","youhhhh"+response.body());
                    mListMarker=new ArrayList<>(response.body());
                    LatLng lng=new LatLng(mListMarker.get(i).getLatitude(),mListMarker.get(i).getLongitude());
                    //set latlng nya
                    Log.v("yees","yees"+(mListMarker.get(i).getLatitude()));
                    //tambahkan markernya
                    mMap.addMarker(new MarkerOptions().position(lng).title(mListMarker.get(i).getPrenom()+mListMarker.get(i).getNom())).setIcon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_GREEN+BitmapDescriptorFactory.HUE_ORANGE));
                    mMap.animateCamera(CameraUpdateFactory.newLatLngZoom(lng,10));
                    //set latlng index ke 0
                    LatLng latLng = new LatLng(mListMarker.get(0).getLatitude(),mListMarker.get(0).getLongitude());
                    //lalu arahkan zooming ke marker index ke 0
                    mMap.animateCamera(CameraUpdateFactory.newLatLngZoom(new LatLng(latLng.latitude,latLng.longitude), 11.0f));

                    final int finalI = i;
                    mMap.setOnInfoWindowClickListener(new GoogleMap.OnInfoWindowClickListener() {
                        @Override
                        public void onInfoWindowClick(final Marker marker) {

                                Intent intent = new Intent(MapsActivity.this, info_from_map.class);
                                String x= String.valueOf(mListMarker.get(finalI).getId_adresse());
                                String y= String.valueOf(mListMarker.get(finalI).getId_donneur());
                                intent.putExtra("mapadr",x);
                                intent.putExtra("mapid",y);
                                Log.v("id_adresse","idadresse"+mListMarker.get(finalI).getId_adresse());
                                Log.v("id_adresse","cccc"+x);
                                startActivity(intent);



                        }
                    });
                }
            }

            @Override
            public void onFailure(Call<List<Map>> call, Throwable t) {
                Log.v("id_adresse","errrrrrro");
            }


        });
/*

        IRamasseur mapd = APIClient.getClient().create(IRamasseur.class);
        mapd.getmapdonnation(Integer.parseInt(string)).enqueue(new Callback<List<Map>>() {
            @Override
            public void onResponse(Call<List<Map>> call, Response<List<Map>> response) {
                for(int j = 0; j<(response.body().size()); j++) {

                    Log.v("yees","yees"+response.body().size());
                    mListMarker=new ArrayList<>(response.body());
                    LatLng lng=new LatLng(mListMarker.get(j).getLatitude(),mListMarker.get(j).getLongitude());
                    //set latlng nya
                    Log.v("yees","yees"+(mListMarker.get(j).getLatitude()));
                    //tambahkan markernya
                    nmap.addMarker(new MarkerOptions().position(lng).title(mListMarker.get(j).getPrenom()+mListMarker.get(j).getPrenom())).setIcon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_YELLOW));

                    nmap.animateCamera(CameraUpdateFactory.newLatLngZoom(lng,10));
                    //set latlng index ke 0
                    LatLng latLng = new LatLng(mListMarker.get(0).getLatitude(),mListMarker.get(0).getLongitude());
                    //lalu arahkan zooming ke marker index ke 0
                    nmap.animateCamera(CameraUpdateFactory.newLatLngZoom(new LatLng(latLng.latitude,latLng.longitude), 11.0f));

                    final int finalI = j;
                    nmap.setOnInfoWindowClickListener(new GoogleMap.OnInfoWindowClickListener() {
                        @Override
                        public void onInfoWindowClick(final Marker marker) {

                            Intent intent = new Intent(MapsActivity.this, yellow_from_map.class);
                            String x= String.valueOf(mListMarker.get(finalI).getId_adresse());
                            String y= String.valueOf(mListMarker.get(finalI).getId_donneur());
                            intent.putExtra("mapadr",x);
                            intent.putExtra("mapid",y);
                            Log.v("id_adresse","idadresse"+mListMarker.get(finalI).getId_adresse());
                            Log.v("id_adresse","cccc"+x);
                            startActivity(intent);



                        }
                    });
                }
            }

            @Override
            public void onFailure(Call<List<Map>> call, Throwable t) {
                Log.v("id_adresse","errrrrrro");
            }


        });*/


        }
    }

    /**
     * method ini digunakan menampilkan data marker dari database
     */
