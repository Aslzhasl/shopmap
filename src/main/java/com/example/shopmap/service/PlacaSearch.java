package com.example.shopmap.service;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class PlacaSearch {
    private final OkHttpClient httpClient = new OkHttpClient();
    private final String apiKey = "YOUR_API_KEY";

    public JSONArray searchPlaces(String query) throws IOException {
        String url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + query + "&key=" + apiKey;
        Request request = new Request.Builder().url(url).build();

        try (Response response = httpClient.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);
            JSONObject jsonResponse = new JSONObject(response.body().string());
            return jsonResponse.getJSONArray("results");
        }
    }
}