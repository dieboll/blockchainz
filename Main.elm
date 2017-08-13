module Main exposing (..)

import Html exposing (Html, Attribute, h1, input, button, div, text)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as Decode
import Bitcoin exposing (..)


main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


type alias TxData =
    { status : String
    , data : String
    }


type alias Model =
    { address : Maybe Address
    , txdata : Maybe TxData
    }


init : ( Model, Cmd Msg )
init =
    ( Model Nothing Nothing, Cmd.none )



-- UPDATE


type Msg
    = Change String
    | Transactions (Result Http.Error TxData)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Change s ->
            case toAddress s of
                Just a ->
                    ( Model (Just a) Nothing, getTransactions a )

                Nothing ->
                    ( model, Cmd.none )

        Transactions (Ok data) ->
            ( Model model.address (Just data), Cmd.none )

        Transactions (Err _) ->
            ( model, Cmd.none )



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "blockchain viewer" ]
        , input [ type_ "text", placeholder "Bitcoin address", onInput Change ] []
        , viewValidation model
        , viewData model
        ]


viewValidation : Model -> Html msg
viewValidation model =
    let
        ( color, message ) =
            case model.address of
                Just _ ->
                    ( "green", "OK" )

                Nothing ->
                    ( "red", "Invalid address" )
    in
        div [ style [ ( "color", color ) ] ] [ text message ]


viewData : Model -> Html msg
viewData model =
    let
        message =
            case model.txdata of
                Just s ->
                    s.status ++ " " ++ s.data

                Nothing ->
                    "no data available"
    in
        div [] [ text message ]



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- HTTP


getTransactions : Address -> Cmd Msg
getTransactions a =
    let
        url =
            "http://btc.blockr.io/api/v1/address/txs/" ++ a
    in
        Http.send Transactions (Http.get url decodeTransactions)


decodeTransactions : Decode.Decoder TxData
decodeTransactions =
    Decode.map2 TxData
        (Decode.field "status" Decode.string)
        (Decode.field "data" Decode.string)
