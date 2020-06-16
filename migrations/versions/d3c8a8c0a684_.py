"""empty message

Revision ID: d3c8a8c0a684
Revises: 7fe63dca6b42
Create Date: 2020-06-15 20:49:24.156110

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd3c8a8c0a684'
down_revision = '7fe63dca6b42'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('dataset_ancestry', schema=None) as batch_op:
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=36))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('dataset_ancestry', schema=None) as batch_op:
        batch_op.alter_column('id',
               existing_type=sa.String(length=36),
               type_=sa.INTEGER())

    # ### end Alembic commands ###
