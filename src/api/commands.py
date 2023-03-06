import click
import cloudinary.uploader
import cloudinary.api
from flask.cli import AppGroup
from api.models import db, Usuario, Actividad, Evento, Participantes_Evento, Tipo_De_Actividad, Favorito, Invitacion

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""


def setup_commands(app):
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add


    """
    @app.cli.command("insert-tipo_de_actividad")
    def insert_tipo_de_actividad_data():
        if len(Tipo_De_Actividad.query.all()) == 0:
            tipos_de_actividad = ["Exterior", "Interior"]
            for tipo_de_actividad in tipos_de_actividad:
                tipo = Tipo_De_Actividad()
                tipo.tipo = tipo_de_actividad
                db.session.add(tipo)
                print("Tipo_de_actividad: ", tipo.tipo, " created.")
            db.session.commit()

            print("All tipos de actividad created")

        else:
            print("La tabla Tipo_de_Actividad ya está llena.")

    @app.cli.command("insert-actividades")
    def insert_actividades_data():
        if len(Actividad.query.all()) == 0:
            actividades = [
                    {"nombre": "Juegos de Agua", "descripcion": "Planea refrescantes juegos de agua en verano para tus hijos y sus amigos. Cada participante lleva los implementos necesarios. Tú eliges el lugar. Cada participante requiere de la compañía de un adulto responsable.", "tipo_de_actividad_id": 1, "imagen": "url"},
                    {"nombre": "Partido de Fútbol", "descripcion": "Organiza un partido de futbol con tus hijos y sus amigos. Cada participante lleva los implementos necesarios. Tú eliges el lugar. Cada participante requiere de la compañía de un adulto responsable. ", "tipo_de_actividad_id": 1, "imagen": "url"},
                    {"nombre": "Picnic", "descripcion": "Ten un picnic con tus hijos y sus amigos. Cada participante lleva algo para compartir entre todos. Tú eliges el lugar. Cada participante requiere de la compañía de un adulto responsable.", "tipo_de_actividad_id": 1, "imagen": "url"},
                    {"nombre": "Ruta en Ruedas", "descripcion": "Montar en Bici, patines o patineta. Cada participante lleva su vehiculo. Tú eliges el lugar. Cada participante requiere de la compañía de un adulto responsable.",
                        "tipo_de_actividad_id": 1, "imagen": "url"},
                    {"nombre": "Juego Libre al Exterior", "descripcion": "Tus hijos y sus amigos podrán jugar libremente en el parque. Tú eliges el lugar. Cada participante requiere de la compañía de un adulto responsable.",
                        "tipo_de_actividad_id": 1, "imagen": "url"},
                    {"nombre": "Manualidades", "descripcion": "Organiza una sesión de manualidades para tus hijos y sus amigos. Cada participante lleva los implementos necesarios. Tú eliges el lugar. Cada participante requiere de la compañía de un adulto responsable.", "tipo_de_actividad_id": 2, "imagen": "url"},
                    {"nombre": "Lectura de Cuentos", "descripcion": "Planea una sesión de lectura o cuentacuentos para tus hijos y sus amigos. Cada participante puede llevar un libro. Tú eliges el lugar. Cada participante requiere de la compañía de un adulto responsable.", "tipo_de_actividad_id": 2, "imagen": "url"},
                    {"nombre": "Juegos de Mesa/Puzzles", "descripcion": "Organiza una sesión de juegos de mesa  y/o puzzles para tus hijos y sus amigos. Cada participante puede llevar un juego/puzzle. Tú eliges el lugar. Cada participante requiere de la compañía de un adulto responsable.", "tipo_de_actividad_id": 2, "imagen": "url"},
                    {"nombre": "Juego Libre en Interior", "descripcion": "Tus hijos y sus amigos podrán jugar libremente. Tú eliges el lugar. Cada participante requiere de la compañía de un adulto responsable.",
                     "tipo_de_actividad_id": 2, "imagen": "url"}]
            for obj_actividad in actividades:
                    actividad = Actividad()
                    actividad.nombre = obj_actividad["nombre"]
                    actividad.descripcion = obj_actividad["descripcion"]
                    actividad.tipo_de_actividad_id = obj_actividad["tipo_de_actividad_id"]
                    actividad.imagen = obj_actividad["imagen"]
                    db.session.add(actividad)
                    print("Actividad: ", actividad.nombre, " created.")
            db.session.commit()

            print("All actividades created")

        else:
            print("La tabla Actividad ya está llena.")

    @app.cli.command("insert-imagenes_actividades")
    def insert_imagenes_data():
        imagenes_actividades = [
            "https://res.cloudinary.com/dfcsm1fzk/image/upload/v1676627381/PlayDating/2_lsrmht_ug8so2.png",
            "https://res.cloudinary.com/dfcsm1fzk/image/upload/v1676627381/PlayDating/4_fcaocu_ltzazd.png",
            "https://res.cloudinary.com/dfcsm1fzk/image/upload/v1676627381/PlayDating/5_y0uy6z_i35lj1.png",
            "https://res.cloudinary.com/dfcsm1fzk/image/upload/v1676627382/PlayDating/9_eqsdfm_juoagg.png",
            "https://res.cloudinary.com/dfcsm1fzk/image/upload/v1676627381/PlayDating/1_uvjrwq_z3acjb.png",
            "https://res.cloudinary.com/dfcsm1fzk/image/upload/v1676627382/PlayDating/8_vbix7b_unorpc.png",
            "https://res.cloudinary.com/dfcsm1fzk/image/upload/v1676627381/PlayDating/3_pfaftn_tjq6by.png",
            "https://res.cloudinary.com/dfcsm1fzk/image/upload/v1676627382/PlayDating/7_iaiefz_c49cif.png",
            "https://res.cloudinary.com/dfcsm1fzk/image/upload/v1676627381/PlayDating/6_qqntku_cb1xgr.png"
        ]

        todas_actividades = Actividad.query.all()
        for i, actividad in enumerate(todas_actividades):
            actividad.imagen = imagenes_actividades[i]
        db.session.commit()

        print("Imagenes cargadas correctamente")
