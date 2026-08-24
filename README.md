# Elec Engineering — Nouveau site

## Ce que tu as reçu
- `index.html` — tout le contenu du site (textes, structure)
- `styles.css` — couleurs, polices, mise en page
- `script.js` — menu mobile + année automatique dans le footer
- `.nojekyll` — fichier vide obligatoire (voir plus bas pourquoi)
- `img/logo.png`, `img/datacenter.jpg`, `img/aeroport.jpg` — images
  (les 2 dernières sont des **placeholders** à remplacer par tes vraies
  photos, même nom de fichier = zéro modif de code)

Aucune dépendance, aucun build : c'est du HTML/CSS/JS pur.

---

## Méthode "sans rien supprimer" (tu gardes tout l'ancien, au cas où)

Ton repo actuel (`amineenim15.github.io`) est un site Jekyll
(`_includes`, `_layouts`, `_sass`, `_config.yml`, `Gemfile`). Bonne
nouvelle : tu n'as **rien besoin de supprimer**. Ces dossiers/fichiers
ne gênent en rien si on ajoute `.nojekyll` — GitHub Pages arrête
simplement d'essayer de les utiliser, ils resteront juste inertes dans
le repo, comme une archive.

Étapes :

1. **Ouvre ton repo `amineenim15.github.io`.**

2. **Ne touche pas au fichier `CNAME`.**
   Son contenu actuel est `www.elec-engineering.net` (avec le "www") —
   c'est ce qui fait fonctionner ton domaine. Ne le supprime pas, ne le
   modifie pas.

3. **Renomme l'ancien `index.html`** en quelque chose comme
   `index-old.html` (pour le garder en archive) — c'est la seule
   étape "obligatoire" car un repo ne peut avoir qu'un seul
   `index.html` actif à la racine, et c'est lui que GitHub Pages sert
   par défaut.

4. **Ajoute les nouveaux fichiers** à la racine du repo, à côté de
   tout le reste (sans rien supprimer) :
   - `index.html` (le nouveau, celui que je t'ai donné)
   - `styles.css`
   - `script.js`
   - `.nojekyll` (fichier vide — voir note ci-dessous)
   - dossier `img/` : ajoute dedans `logo.png`, `datacenter.jpg`,
     `aeroport.jpg` (à côté des anciennes images du dossier `img/`
     existant, pas de conflit de nom)

   ⚠️ Le fichier `.nojekyll` commence par un point et est vide — sur
   GitHub web, utilise "Add file → Upload files". Certains
   explorateurs de fichiers (Finder, Explorer) cachent par défaut les
   fichiers commençant par un point : active "afficher les fichiers
   cachés" si tu prépares les fichiers en local avant l'upload.

5. **Commit + push** :
   ```bash
   git add -A
   git commit -m "Nouveau site Elec Engineering (statique, sans Jekyll)"
   git push
   ```

6. Attends 1 à 2 minutes (déploiement GitHub Pages) puis vérifie sur
   `https://www.elec-engineering.net`.

**Aucune étape DNS/Square n'est nécessaire** : le CNAME ne bouge pas.

### Pourquoi `.nojekyll` est nécessaire ici
Sans lui, GitHub Pages essaie de builder le repo avec Jekyll (à cause
de `_config.yml`, `_layouts`, etc.) et pourrait mal interpréter le
nouveau `index.html` ou entrer en conflit avec l'ancien thème. Avec
`.nojekyll`, GitHub Pages sert directement les fichiers tels quels —
l'ancien Jekyll reste présent dans le repo mais n'est jamais exécuté.

---

## Pour personnaliser rapidement

| Tu veux changer...        | Va dans...                                  |
|----------------------------|----------------------------------------------|
| Un texte                   | `index.html`, cherche le texte à l'œil       |
| Les couleurs / polices     | `styles.css`, tout en haut (`:root { ... }`) |
| Le numéro de téléphone     | `index.html`, section CONTACT                |
| Les photos de réalisations | dossier `img/`                               |
| Ajouter une 3e réalisation | `index.html`, dupliquer un bloc `.project`   |

Chaque section du HTML est encadrée par un commentaire du type
`<!-- SECTION : ... -->` pour la retrouver facilement.
