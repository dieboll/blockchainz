(ns growing-chains.core
  (:require [cljsjs.three]))

(defn get-camera
  []
  (doto
      (js/THREE.PerspectiveCamera. 45
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

(def side1 (create-side (map (fn [x] (* x 10)) [2 3 4 5 6 2 3 4 6 8 3 4 5 7 9 3 4 5 6 8 9 4 3 5 6 8 9 4 2])))

(defn create-mesh
  [geometry]
  (js/THREE.Mesh. geometry (js/THREE.MeshPhongMaterial.)))


(def object (create-mesh side1))
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
