package com.esprit.go_recycle;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import java.util.List;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager.widget.PagerAdapter;

public class SliderAdapter extends RecyclerView.Adapter<SliderAdapter.OnboardingViewHolder> {
   private List<SliderItem> sliderItems;

    public SliderAdapter(List<SliderItem> sliderItems) {
        this.sliderItems = sliderItems;
    }

    @NonNull
    @Override
    public OnboardingViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new OnboardingViewHolder(
                LayoutInflater.from(parent.getContext()).inflate(
                        R.layout.slider,parent,false
                )
        );
    }

    @Override
    public void onBindViewHolder(@NonNull OnboardingViewHolder holder, int position) {
holder.setOnboardingData(sliderItems.get(position));
    }

    @Override
    public int getItemCount() {
        return sliderItems.size();
    }

    class OnboardingViewHolder extends RecyclerView.ViewHolder{
        private  ImageView imageslide;
        private  TextView text1;
        private TextView text2;

        public OnboardingViewHolder(@NonNull View itemView) {
            super(itemView);
            text1=itemView.findViewById(R.id.txt1);
            text2=itemView.findViewById(R.id.txt2);
            imageslide=itemView.findViewById(R.id.imageslide);
        }
        void setOnboardingData(SliderItem sliderItem){
               text1.setText(sliderItem.getTitre());
               text2.setText(sliderItem.getDescription());
               imageslide.setImageResource(sliderItem.getImage());
        }
    }

    Context context;
    LayoutInflater layoutInflater;
   /*public SliderAdapter(Context context){
        this.context=context;
    }
    public int [] slideimages ={
            R.drawable.s1,
            R.drawable.s2,
            R.drawable.s3

    };
    public String[] Slideheading ={
            "Stocker",
            "Collecter",
            "Recycler"
    };
    public String[] Slidedesc ={
            "Go_recycle vous permet de créer un\n" +
                    " lien entre vous et le collecteur des\n" +
                    "Objets recyclable, pour commencer et \n" +
                    "essayer, stocker une quantité ",
            "Deposer vos Articles dans l'application\n" +
                    "Un collecteur A proximité de vous \n" +
                    "va passer récupérer les articles \n" +
                    "Votre solde va s'augmenter ",
            "Le Collecteur Depose les articles\n" +
                    "Dans les points de recyclage \n" +
                    "BE un ecoFriendly et bénéficier\n" +
                    "des offres "

    };
    public SliderAdapter(Context context){
        this.context=context;
    }
*/

}

