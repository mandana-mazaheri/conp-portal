"""empty message

Revision ID: 4f6d863a1373
Revises: 191bfcc7bae6
Create Date: 2021-02-15 17:21:15.331602

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4f6d863a1373'
down_revision = '191bfcc7bae6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('matomo_daily_visits_summary', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.DATE(),
               type_=sa.String(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('matomo_daily_visits_summary', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.String(),
               type_=sa.DATE(),
               existing_nullable=True)

    # ### end Alembic commands ###
