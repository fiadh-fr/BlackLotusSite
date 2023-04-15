<?php

// URL de l'API
$url = "http://kikyo.website:1331/api/constellations";

// Token Bearer
$token = "K5VJ3UhWlzhIfHElDxCP";

// En-têtes de la requête
$headers = array(
    "Authorization: Bearer " . $token,
    "Content-Type: application/json"
);

// Configuration de la requête
$options = array(
    "http" => array(
        "method" => "GET",
        "header" => implode("\r\n", $headers)
    )
);

// Envoi de la requête et récupération des données
$response = file_get_contents($url, false, stream_context_create($options));

// Conversion de la réponse JSON en tableau associatif
$data = json_decode($response, true);

// Création du tableau HTML avec les en-têtes
echo '<table>';
echo '<tr>';
echo '<th>Constellation</th>';
echo '<th>Display Name</th>';
echo '<th>Members</th>';
echo '</tr>';

// Parcours des éléments du tableau associatif et remplissage du tableau HTML avec les données souhaitées
foreach ($data as $constellation => $values) {
    foreach ($values as $item) {
        $constellationName = $constellation;
        $displayName = isset($item["displayName"]) ? $item["displayName"] : "";
        $members = isset($item["members"]) ? $item["members"] : "";

        echo '<tr>';
        echo '<td>' . $constellationName . '</td>';
        echo '<td>' . $displayName . '</td>';
        echo '<td>' . $members . '</td>';
        echo '</tr>';
    }
}

// Fermeture du tableau HTML
echo '</table>';

?>
