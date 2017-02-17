{% extends 'layout.swig' %}

{% block content %}
  <h1>{{ title }}</h1>
  {% if articles %}
    <ul>
      {% for article in articles %}
        <a href="/articles/{{ article.id }}" >{{ article.title }}</a>
      {% endfor %}
    </ul>
  {% else %}
    <p>No articles yet.</p>
  {% endif %}
{% endblock %}
