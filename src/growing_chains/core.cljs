(ns growing-chains.core
  (:require [cljsjs.three] [cljsjs.fabric] ))


(defn get-camera
  []
  (doto (js/THREE.PerspectiveCamera.
         45
         (/ (.-innerWidth js/window)
            (.-innerHeight js/window))
         1 1000)
    (.. -position (set 500 0 0))))

(defn get-renderer
  []
  (let [canvas (.getElementById js/document "vis")
        renderer (js/THREE.WebGLRenderer. #js {:canvas canvas})]
    (.setSize renderer (.-innerWidth js/window) (.-innerHeight js/window))
    renderer))

(def renderer (get-renderer))
(def scene (js/THREE.Scene.))
(def camera (get-camera))
(.lookAt camera (js/THREE.Vector3.))

(defn get-spotlight
  [x y z intensity]
  (let [light (js/THREE.SpotLight.
               0x2c61ac
               1.0
               1000
               (/ (.-PI js/Math) 2)
               1.0
               1)]
    (.set (.-position light) x y z)
    (aset light "castShadow" true)
    light))

(def key-light (get-spotlight 300 100 200 2))
(def fill-light (get-spotlight 300 0 -200 0.5))
(def back-light (get-spotlight -200 0 300 0.5))

(.add scene key-light)
(.add scene fill-light)
(.add scene back-light)

(defn get-animal
  ([exchange-delta]
   (if (pos? exchange-delta)
     (fn [sign]
       (str "bull" ({:good "brown" :bad "green"} sign)))
     (fn [sign]
       (str "bear" ({:good "brown" :bad "black"} sign)))))
  ([balance balance-delta]
   (if (< balance-delta (* .25 balance))
     (fn [sign]
       (str "pig" ({:good "pink" :bad "green"} sign)))
     (fn [sign]
       (str "chicken" ({:good "purple" :bad "yellow"} sign))))))

(defn get-color
  [d-balance]
  (if (pos? d-balance)
    :good
    :bad))

(defn image-url
  [animal color]
  (str
   (animal color)
   ".svg"))

;; (defn create-USDcanvas
;;   [d-balance d-exchange height width]
;;   "Creates the texture for a USD side face."
;;   (let
;;     [texcanvas (js/fabric.Canvas. d-balance d-exchange height width)]
;;     (if (< height (/ width 2))
;;         (let
;;             [animal (get-animal d-exchange)
;;              color (get-color d-balance)
;;              icon (js/fabric.Image.fromURL (image-url animal color))]
;;           (body-exprs)))
;;     (write-balance)))

;; (defn create-BTCcanvas
;;   [d-balance balance height width]
;;   "Creates the texture for a BTC side face."
;;   (let
;;     [texcanvas (js/fabric.Canvas. d-balance balance height width)]
;;     (if (< height (/ width 2))
;;         (let
;;             [animal (get-animal balance d-balance)
;;              color (get-color d-balance)
;;              icon (js/fabric.Image.fromURL (image-url animal color))]
;;           (body-exprs)))
;;     (write-balance)))

(defn create-shape
  [heights]
  (doto (js/THREE.Shape.)
    (.moveTo 0 0)
    (.lineTo 0 (first heights))
    (.splineThru (to-array (keep-indexed (fn [x y] (js/THREE.Vector2. (* 10 x) y)) heights)))
    (.moveTo (dec (count heights)) 0)
    (.closePath)))

(defn create-side
  [heights]
  (let [shape (create-shape heights)]
    (js/THREE.ShapeGeometry. shape)))

;; (defn create-shell
;;   [usd-balances btc-balances]
;;   (let [usd-shape]))

(def side1 (create-side (map (fn [x] (* x 10)) [2 3 4 5 6 2 3 4 6 8 3 4 5 7 9 3 4 5 6 8 9 4 3 5 6 8 9 4 2])))

(def side2 (create-side (map (fn [x] (* x -10)) [2 3 4 5 6 2 3 4 6 8 3 4 5 7 9 3 4 5 6 8 9 4 3 5 6 8 9 4 2])))

;; (def x-reflect (doto js/THREE.Matrix4.
;;                  (.set
;;                   )))

(defn mod-geom
  []
  (doto side1
    (.merge (.rotateX side2 js/Math.PI))
    (.mergeVertices)))

(defn create-mesh
  [geometry]
  (js/THREE.Mesh. geometry (js/THREE.MeshBasicMaterial.)))

(def object (create-mesh (mod-geom)))
(.. object -position (set 0 0 0))
(.add scene object)

(defn do-render
  "Called on each render."
  []
  ; Rotates white rect:
  (set! (.. object -rotation -x)
        (+ (.. object -rotation -x) 0.01))
  (set! (.. object -rotation -y)
        (+ (.. object -rotation -y) 0.01)))

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
