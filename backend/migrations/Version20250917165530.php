<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250917165530 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE assessment ADD candidat_id INT NOT NULL, DROP candidate, CHANGE result_json result_json JSON NOT NULL, CHANGE summary summary LONGTEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE assessment ADD CONSTRAINT FK_F7523D708D0EB82 FOREIGN KEY (candidat_id) REFERENCES candidat (id)');
        $this->addSql('CREATE INDEX IDX_F7523D708D0EB82 ON assessment (candidat_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE assessment DROP FOREIGN KEY FK_F7523D708D0EB82');
        $this->addSql('DROP INDEX IDX_F7523D708D0EB82 ON assessment');
        $this->addSql('ALTER TABLE assessment ADD candidate VARCHAR(255) NOT NULL, DROP candidat_id, CHANGE result_json result_json VARCHAR(255) NOT NULL, CHANGE summary summary LONGTEXT NOT NULL');
    }
}
