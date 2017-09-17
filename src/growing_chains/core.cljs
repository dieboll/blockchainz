(ns growing-chains.core
  (:require [cljsjs.three]))

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

; Creates white rect:
(def rect (create-rect 100 100 100))
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
