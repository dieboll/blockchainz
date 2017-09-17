(ns growing-chains.core
  (:require [[cljsjs.three][cljsjs.fabric]]))


(defn get-camera
  []
  (doto
      (js/THREE.PerspectiveCamera. 45
                                   (/ (.-innerWidth js/window)
                                      (.-innerHeight js/window))
                                   1 1000)
    (.. -position (set 500 100 500))))

(defn get-renderer
  []
  (let [canvas (.getElementById js/document "vis")
        renderer (js/THREE.WebGLRenderer. #js {:canvas canvas})]
    (.setSize renderer (.-innerWidth js/window) (.-innerHeight js/window))
    renderer))

(def renderer (get-renderer))
(def scene (js/THREE.Scene.))
(def camera (get-camera))

(.add scene (js/THREE.AmbientLight.))

(defn create-rect
  "Creates a rect with given color and xyz."
  [x y z]
  (js/THREE.Mesh. (js/THREE.BoxGeometry. x y z)
                  (js/THREE.MeshBasicMaterial.)))

(defn create-USDcanvas
  [d-balance d-exchange height width]
  "Creates the texture for a USD side face."
  (let
    [texcanvas (js/fabric.Canvas. dbalance dexchange height width)]
    (if (< height width/2)
        (let
          [animal (list (if ( < d-exchange 0) :bull :bear)(if ( < d-balance 0) :bad :good))
           image-url (case animal
                       '(:bull :good) "brownbull.svg"
                       '(:bull :bad)  "greenbull.svg"
                       '(:bear :good) "brownbear.svg"
                       '(:bear :bad)  "blackbear.svg")
           icon (js/fabric.Image.fromURL image-url)]
          (body-exprs)))
    (write-balance)))

(defn create-BTCcanvas
  [d-balance balance height width]
  "Creates the texture for a BTC side face."
  (let
    [texcanvas (js/fabric.Canvas. dbalance balance height width)]
    (if (< height width/2)
        (let
          [animal (list (if ( < d-balance (.25 * balance)) :pig :chicken)(if ( < d-balance 0) :bad :good))
           image-url (case animal
                       '(:pig :good) "pinkpig.svg"
                       '(:pig :bad)  "greenpig.svg"
                       '(:chicken :good) "purplechicken.svg"
                       '(:chicken :bad)  "yellowchicken.svg")
           icon (js/fabric.Image.fromURL image-url)]
          (body-exprs)))
    (write-balance)))




; Creates white rect:
(def rect (create-rect 50 50 50))
(.. rect -position (set 0 0 0))
(.add scene rect)

(.lookAt camera (js/THREE.Vector3.))

(defn do-render
  "Called on each render."
  []
  ; Rotates white rect:
  (set! (.. rect -rotation -x)
        (+ (.. rect -rotation -x) 0.01))
  (set! (.. rect -rotation -y)
        (+ (.. rect -rotation -y) 0.01)))

(defn render
  "Called on each render. This function does not reload on change."
  []
  (js/requestAnimationFrame render)
  (.updateProjectionMatrix camera)
  (do-render)
  (.render renderer scene camera))

; Not reload render function when code changed:
(defonce render-started (atom false))
(when-not @render-started
  (render)
  (reset! render-started true))
