package com.esprit.go_recycle;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;

import androidx.cardview.widget.CardView;
import androidx.fragment.app.Fragment;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import android.preference.PreferenceManager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.esprit.go_recycle.classes.APIClient;
import com.esprit.go_recycle.dao.IDonnation;
import com.esprit.go_recycle.models.solde;

import java.io.ByteArrayOutputStream;

import javax.xml.transform.Result;

import static android.content.Context.MODE_PRIVATE;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link PanierFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class PanierFragment extends Fragment {
    private CardView cardverre ,cardpille,cardcarton,cardvetement,cardplatique,cardsachet;
    SharedPreferences shared;
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public PanierFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment PanierFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static PanierFragment newInstance(String param1, String param2) {
        PanierFragment fragment = new PanierFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
     View view=inflater.inflate(R.layout.fragment_panier, container,false);
        cardverre=view.findViewById(R.id.cardverre);
        cardcarton=view.findViewById(R.id.cardcarton);
        cardpille=view.findViewById(R.id.cardpille);
        cardplatique=view.findViewById(R.id.cardplastique);
        cardvetement=view.findViewById(R.id.cardvetement);
        cardsachet=view.findViewById(R.id.cardsachet);

        ImageView verre=view.findViewById(R.id.verre);
        ImageView sachet=view.findViewById(R.id.sachet);
        ImageView pille=view.findViewById(R.id.pille);
        ImageView carton=view.findViewById(R.id.carton);
        ImageView vetement=view.findViewById(R.id.vetement);
        ImageView plastique=view.findViewById(R.id.bouteilleplastic);
        final SharedPreferences prefs =this.getActivity().getSharedPreferences("IdUser",
                MODE_PRIVATE);
         final String string = prefs.getString("Key", null);
        Log.v("theuser","idddddddd"+string);

/////GET MY SCORE

        verre.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                IDonnation IUser = APIClient.getClient().create(IDonnation.class);
                IUser.getscore(Integer.parseInt(string)).enqueue(new Callback<solde>() {
                    @Override
                    public void onResponse(Call<solde> call, Response<solde> response) {
                        if(response.isSuccessful()) {
                            int x = response.body().getNouveau_score();

                            Log.v("myscore", "dddd" + x);
                            Intent intent = new Intent(getActivity(),produitdonnation.class);
                            intent.putExtra("name","Verre");
                            intent.putExtra("description","les verres peux causer plusieurs problemes, protoger la nature");
                            intent.putExtra("image",R.drawable.verre);

                            intent.putExtra("solde",x);
                            startActivity(intent);
                        }
                    }

                    @Override
                    public void onFailure(Call<solde> call, Throwable t) {
                        Log.v("TAG!!!!!!!!!!!!!!!!!", "error2" + t.getMessage());
                    }



                });

            }
        });
        sachet.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                IDonnation IUser = APIClient.getClient().create(IDonnation.class);
                IUser.getscore(Integer.parseInt(string)).enqueue(new Callback<solde>() {
                    @Override
                    public void onResponse(Call<solde> call, Response<solde> response) {
                        if(response.isSuccessful()) {
                            int x = response.body().getNouveau_score();
                Intent intent = new Intent(getActivity(),produitdonnation.class);
                intent.putExtra("name","Sachet");
                intent.putExtra("description","60% des poissons sont morts dans les Oceans a cause des sachet en plastique");
                intent.putExtra("image",R.drawable.sachet);

                            intent.putExtra("solde",x);
                            startActivity(intent);
                        }
                    }

                    @Override
                    public void onFailure(Call<solde> call, Throwable t) {
                        Log.v("TAG!!!!!!!!!!!!!!!!!", "error2" + t.getMessage());
                    }



                });
            }
        });
        pille.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                   IDonnation IUser = APIClient.getClient().create(IDonnation.class);
                   IUser.getscore(Integer.parseInt(string)).enqueue(new Callback<solde>() {
                       @Override
                       public void onResponse(Call<solde> call, Response<solde> response) {
                           if(response.isSuccessful()) {
                               int x = response.body().getNouveau_score();
                Intent intent = new Intent(getActivity(),produitdonnation.class);
                intent.putExtra("name","Pille");
                intent.putExtra("description","les pilles ne sont pas des objets biodegradables ");
                intent.putExtra("image",R.drawable.pille);

                intent.putExtra("solde",x);
                startActivity(intent);
                      }
         }

         @Override
         public void onFailure(Call<solde> call, Throwable t) {
                           Log.v("TAG!!!!!!!!!!!!!!!!!", "error2" + t.getMessage());
                       }
                   });
            }
        });
        carton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                IDonnation IUser = APIClient.getClient().create(IDonnation.class);
                IUser.getscore(Integer.parseInt(string)).enqueue(new Callback<solde>() {
                    @Override
                    public void onResponse(Call<solde> call, Response<solde> response) {
                        if(response.isSuccessful()) {
                            int x = response.body().getNouveau_score();
                Intent intent = new Intent(getActivity(),produitdonnation.class);
                intent.putExtra("name","Carton");
                intent.putExtra("description","On peux vous offrir une meilleur qualite des papier en carton, Recycler les");
                intent.putExtra("image",R.drawable.carton);
                  intent.putExtra("solde",x);
                  startActivity(intent);
                        }
                    }

                    @Override
                    public void onFailure(Call<solde> call, Throwable t) {
                        Log.v("TAG!!!!!!!!!!!!!!!!!", "error2" + t.getMessage());
                    }
                                        });
            }
        });
        vetement.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                IDonnation IUser = APIClient.getClient().create(IDonnation.class);
                IUser.getscore(Integer.parseInt(string)).enqueue(new Callback<solde>() {
                    @Override
                    public void onResponse(Call<solde> call, Response<solde> response) {
                        if(response.isSuccessful()) {
                            int x = response.body().getNouveau_score();
                Intent intent = new Intent(getActivity(),produitdonnation.class);
                intent.putExtra("name","Vetement");
                intent.putExtra("description","des familles ont besoin de vos anciens vetements ne jetez pas donc, vasy Recycler");
                intent.putExtra("image",R.drawable.dress);

                intent.putExtra("solde",x);
                startActivity(intent);
                        }
                    }
                    @Override
                    public void onFailure(Call<solde> call, Throwable t) {
                        Log.v("TAG!!!!!!!!!!!!!!!!!", "error2" + t.getMessage());
                    }

                });
            }
        });
        plastique.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                IDonnation IUser = APIClient.getClient().create(IDonnation.class);
                IUser.getscore(Integer.parseInt(string)).enqueue(new Callback<solde>() {
                    @Override
                    public void onResponse(Call<solde> call, Response<solde> response) {
                        if(response.isSuccessful()) {
                            int x = response.body().getNouveau_score();
                Intent intent = new Intent(getActivity(),produitdonnation.class);
                intent.putExtra("name","Plastique");
                intent.putExtra("description","Waaaw, plusieurs bouteilles en plastique c'est genial");
                intent.putExtra("image",R.drawable.plastique);

                intent.putExtra("solde",x);
                startActivity(intent);
                        }
                    }

                    @Override
                    public void onFailure(Call<solde> call, Throwable t) {
                        Log.v("TAG!!!!!!!!!!!!!!!!!", "error2" + t.getMessage());
                    }

                });
            }
        });
        return view;
    }


}