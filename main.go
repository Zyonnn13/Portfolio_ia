package main

import (
	"html/template"
	"log"
	"net/http"
	"time"
)

type PageData struct {
	Title       string
	CurrentYear int
	PageName    string
}

func main() {

	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/about", aboutHandler)
	http.HandleFunc("/contact", contactHandler)

	port := ":8080"
	log.Printf("Serveur démarré sur http://localhost%s", port)
	log.Fatal(http.ListenAndServe(port, nil))
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		notFoundHandler(w, r)
		return
	}

	data := PageData{
		Title:       "Clément Belmondo - Portfolio",
		CurrentYear: time.Now().Year(),
		PageName:    "home",
	}

	renderTemplate(w, "templates/index.html", data)
}

func aboutHandler(w http.ResponseWriter, r *http.Request) {
	data := PageData{
		Title:       "À Propos - Clément Belmondo",
		CurrentYear: time.Now().Year(),
		PageName:    "about",
	}

	renderTemplate(w, "templates/index.html", data)
}

func contactHandler(w http.ResponseWriter, r *http.Request) {
	data := PageData{
		Title:       "Contact - Clément Belmondo",
		CurrentYear: time.Now().Year(),
		PageName:    "contact",
	}

	renderTemplate(w, "templates/index.html", data)
}

func notFoundHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNotFound)
	tmpl, err := template.ParseFiles("templates/404.html")
	if err != nil {
		http.Error(w, "404 - Page non trouvée", http.StatusNotFound)
		return
	}
	tmpl.Execute(w, nil)
}

func renderTemplate(w http.ResponseWriter, tmplPath string, data interface{}) {
	tmpl, err := template.ParseFiles(tmplPath)
	if err != nil {
		http.Error(w, "Erreur lors du chargement du template", http.StatusInternalServerError)
		log.Printf("Erreur template: %v", err)
		return
	}

	err = tmpl.Execute(w, data)
	if err != nil {
		http.Error(w, "Erreur lors de l'exécution du template", http.StatusInternalServerError)
		log.Printf("Erreur exécution: %v", err)
	}
}
