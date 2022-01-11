package com.esprit.go_recycle;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IEvenement;
import com.esprit.go_recycle.models.Evenement;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static android.content.Context.MODE_PRIVATE;

public class HomeFragment extends Fragment {
    private ArrayList<Evenement> me;
    View v;
    private RecyclerView rc;
    FloatingActionButton btnadd;

    AccueilAdapter ev;
    //decl
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";
    private String mParam1;
    private String mParam2;

    public HomeFragment() {

    }


    public static HomeFragment newInstance(String param1, String param2) {
        HomeFragment fragment = new HomeFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        /*
        me=new ArrayList<>();
        me.add(new modelaccueilevent("CleanUP", "Ghazella technopole", "khalil mahdi", "21/12/2020"));
        me.add(new modelaccueilevent("CleanUP", "Ghazella technopole", "khalil mahdi", "21/12/2020"));
        me.add(new modelaccueilevent("CleanUP", "Ghazella technopole", "khalil mahdi", "21/12/2020"));
        me.add(new modelaccueilevent("CleanUP", "Ghazella technopole", "khalil mahdi", "21/12/2020"));
        me.add(new modelaccueilevent("CleanUP", "Ghazella technopole", "khalil mahdi", "21/12/2020"));
        me.add(new modelaccueilevent("CleanUP", "Ghazella technopole", "khalil mahdi", "21/12/2020"));*/
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home, container, false);
        rc = view.findViewById(R.id.recycleview2);
        btnadd = view.findViewById(R.id.btnadd);
        SharedPreferences prefs = this.getActivity().getSharedPreferences("IdUser",
                MODE_PRIVATE);
        final String string = prefs.getString("Key", null);
        rc.setLayoutManager(new LinearLayoutManager(getActivity()));
        Log.v("successssssssssssssssss", "imeeeeen" + Integer.parseInt(string));

        if (isNetworkAvailable()) {
            Log.i("test connexion oui  ====>", String.valueOf(isNetworkAvailable()));
            if (!prefs.contains("lib")) {
                final SharedPreferences.Editor prefEditor = prefs.edit();
                prefEditor.putString("lib", null);
                prefEditor.commit();
            }
            JSONObject jsonBody = new JSONObject();
            final String mRequestBody = jsonBody.toString();
            IEvenement IUser = APIClient.getClient().create(IEvenement.class);
            IUser.getevents(Integer.parseInt(string)).enqueue(new Callback<List<Evenement>>() {
                @Override
                public void onResponse(Call<List<Evenement>> call, Response<List<Evenement>> response) {

                    if (response.isSuccessful()) {
                        me = new ArrayList<>(response.body());
                        ev = new AccueilAdapter(getContext(), me);
                        rc.setAdapter(ev);
                        Log.v("tesssssssssssssssssssssst", response.body().toString());


                            try {
                                JSONArray jsonArray = null;
                                try {
                                     jsonArray = new JSONArray(response);
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                                Log.i("JSON ARRAY  ", jsonArray.toString());


                                for (int i = 0; i < jsonArray.length(); i++) {
                                Evenement book = new Evenement();
                                    book.setId_evenement(jsonArray.getJSONObject(i).get("id_evenement").toString());
                                    book.setNom(jsonArray.getJSONObject(i).get("nom").toString());
                                    book.setLieu(jsonArray.getJSONObject(i).get("lieu").toString());
                                    book.setDate(jsonArray.getJSONObject(i).get("date").toString());

                                me.add(book);
                            }
                            Log.i("size array =======================>", String.valueOf(me.size()));
                            /////////////////////lib preferences
                            final SharedPreferences.Editor prefEditor = prefs.edit();
                            prefEditor.putString("lib", String.valueOf(me));
                            Log.i("Lib contenu",String.valueOf(me));
                            prefEditor.commit();

                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }


                @Override
                public void onFailure(Call<List<Evenement>> call, Throwable t) {
                    Log.e("failure", t.getLocalizedMessage());

                }
            });

        } else {
            if (!prefs.contains("lib")) {
                final SharedPreferences.Editor prefEditor = prefs.edit();
                prefEditor.putString("lib", null);
                prefEditor.commit();
            }
            Log.i("test connexion non  ====>", String.valueOf(isNetworkAvailable()));
            String JsonArray = prefs.getString("lib", null);
//            Log.i("thedataoffline", String.valueOf(JsonArray.length()));


            try {
                if (JsonArray != null) {
                    Log.v("itnotnull","yes");
                    JSONArray mJSONArray = new JSONArray(JsonArray);
                    Log.v("thejson","yes"+JsonArray.length());

                    for (int i = 0; i < mJSONArray.length(); i++) {
                        Log.v("dkkkkkk","yes"+i);
                        JSONObject jsonObject=mJSONArray.getJSONObject(i);
                        Log.i("loooog",""+jsonObject);
                        Evenement book = new Evenement();
                        book.setId_evenement(mJSONArray.getJSONObject(i).get("id_evenement").toString());
                        book.setNom(mJSONArray.getJSONObject(i).get("nom").toString());
                        book.setLieu(mJSONArray.getJSONObject(i).get("lieu").toString());
                        book.setDate(mJSONArray.getJSONObject(i).get("date").toString());

                        me.add(book);
                        Log.v("lecontenume","yeh"+me);
                    }
                    Log.i("size array =======================>", String.valueOf(mJSONArray.length()));
                    /////////////////////lib preferences

                    ev = new AccueilAdapter(getContext(), me);
                    rc.setAdapter(ev);
                    Toast.makeText(getContext(), "Need connexion ", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(getContext(), "Need connexion ", Toast.LENGTH_SHORT).show();

                }

            } catch (Exception e) {
                e.printStackTrace();
            }


        }


        btnadd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(), AjouterEvenemnt.class);
                startActivity(intent);
            }
        });
        return view;
    }


    private boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager
                = (ConnectivityManager) getContext().getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
        return activeNetworkInfo != null && activeNetworkInfo.isConnected();
    }
}
