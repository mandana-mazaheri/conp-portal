"""add matomo_daily_site_keyword_searches_summary table

Revision ID: eab8cbe3da7a
Revises: 3c0e54159f59
Create Date: 2021-02-22 16:11:48.722152

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eab8cbe3da7a'
down_revision = '3c0e54159f59'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('matomo_daily_site_keyword_searches_summary',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('date', sa.String(), nullable=True),
    sa.Column('avg_time_on_page', sa.Integer(), nullable=True),
    sa.Column('bounce_rate', sa.String(), nullable=True),
    sa.Column('exit_nb_visits', sa.Integer(), nullable=True),
    sa.Column('exit_rate', sa.String(), nullable=True),
    sa.Column('label', sa.String(), nullable=True),
    sa.Column('nb_hits', sa.Integer(), nullable=True),
    sa.Column('nb_pages_per_search', sa.Integer(), nullable=True),
    sa.Column('nb_visits', sa.Integer(), nullable=True),
    sa.Column('segment', sa.String(), nullable=True),
    sa.Column('sum_time_spent', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('matomo_daily_site_keyword_searches_summary')
    # ### end Alembic commands ###
