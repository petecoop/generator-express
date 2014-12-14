{% extends 'layout.swig' %}

{% block content %}
  {{ message }}
  {{ error.status }}
  {{ error.stack }}
{% endblock %}
